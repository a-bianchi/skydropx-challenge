import { Get, JsonController, Param, Post, UploadedFile, UseBefore } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { ImportResponse } from '../dtos/import.response.dto';
import { ImportService } from '../services/import.service';
import multer from 'multer';
import { decodeAndValidateAccessToken } from '../middlewares/decodeJwt.middleware';
import { HttpNotFound } from '../libraries/httpErrors';
const upload = multer();
@OpenAPI({
  security: [{ jwt: [] }],
})
@UseBefore(decodeAndValidateAccessToken)
@JsonController('/import')
export class ImportController {
  private importService = new ImportService();

  @Get('/:id')
  @OpenAPI({
    summary: 'Return a single import',
  })
  @ResponseSchema(ImportResponse)
  async getOne(@Param('id') id: string) {
    const importResponse = await this.importService.getOneImport(id);
    let errors;
    if (!importResponse) throw new HttpNotFound('IMPORT_NOT_FOUND');
    if (importResponse.errors.length > 0)
      errors = importResponse.errors.map((error) => {
        return {
          lineNumber: error.line,
          error: JSON.parse(error.error),
        };
      });
    return {
      importId: id,
      status: importResponse.status,
      errors,
    };
  }

  @Post('/')
  @OpenAPI({
    summary: 'Create a new import',
    requestBody: {
      content: {
        'multipart/form-data': {
          schema: {
            properties: {
              file: {
                format: 'binary',
                type: 'string',
              },
            },
            required: ['file'],
            type: 'object',
          },
        },
      },
    },
  })
  @UseBefore(upload.single('file'))
  async createImportFile(@UploadedFile('file') file: Express.Multer.File) {
    const importId = await this.importService.createImport(file.buffer, file.mimetype);
    return { importId };
  }
}
