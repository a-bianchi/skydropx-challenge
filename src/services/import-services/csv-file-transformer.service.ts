import { TransformCallback, Writable } from 'stream';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { ImportService } from '../import.service';
import { ImportErrorMessagesDto } from '../../dtos/importError.dto';
import { Order } from '../../dtos/order.dto';

export class CSVTransformer extends Writable {
  private readonly importService: ImportService = new ImportService();
  private lineNumber = 0;
  private hasError = false;

  constructor(private readonly importId: string) {
    super({ objectMode: true });
  }
  _write(chunk: Order, encoding: BufferEncoding, callback: (error?: Error) => void): void {
    const orderDto = plainToClass(Order, chunk);
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
      })
      .finally(() => callback());
  }

  _final(callback: TransformCallback): void {
    if (this.hasError) {
      this.importService.markImportFailed(this.importId).catch(console.error);
    } else {
      this.importService.markImportSuccess(this.importId).catch(console.error);
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
