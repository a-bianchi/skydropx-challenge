import { Transform, TransformCallback } from 'stream';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { ImportService } from '../import.service';
import { ImportErrorMessagesDto } from '../../dtos/importError.dto';
import { Order } from '../../dtos/order.dto';

export class CSVTransformer extends Transform {
  private readonly importService: ImportService = new ImportService();
  private lineNumber = 0;
  private hasError = false;

  constructor(private readonly importId: string) {
    super({ objectMode: true });
  }

  _transform(chunk: string, encoding: BufferEncoding, callback: TransformCallback): void {
    const jsonChunk = JSON.parse(chunk);
    const orderDto = plainToClass(Order, jsonChunk);
    orderDto.lineNumber = ++this.lineNumber;

    validate(orderDto)
      .then(async (errors) => {
        try {
          if (errors.length > 0) {
            const importErrorMessages = this.extractValidationErrors(errors);
            this.hasError = true;
            await this.importService.storeErrors(this.importId, orderDto.lineNumber, importErrorMessages);
          } else {
            await this.importService.createOrder(orderDto);
          }
        } catch (error) {
          console.log('ERROR: _transform', error);
        }
      })
      .catch(async (error: Error) => {
        await this.importService.storeErrors(this.importId, orderDto.lineNumber, [new ImportErrorMessagesDto([error.message], '', '')]);
      });

    callback(null, '');
  }

  async _final(callback: (error?: Error) => void): Promise<void> {
    console.log('_final');
    if (this.hasError) {
      await this.importService.markImportFailed(this.importId);
    } else {
      await this.importService.markImportSuccess(this.importId);
    }
    callback();
  }
  private extractValidationErrors(errors: ValidationError[]): ImportErrorMessagesDto[] {
    return errors.map((error) => {
      const messages: string[] = [];
      for (const property in error.constraints) {
        messages.push(error.constraints[property]);
      }
      return new ImportErrorMessagesDto(messages, error.property, error.value);
    });
  }
}
