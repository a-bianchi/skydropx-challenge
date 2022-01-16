import { NextFunction, Request, Response } from 'express';
import { Body, Get, JsonController, Param, Post } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { CreateImportBody } from '../dtos/import.create.body.dto';
import { ImportResponse } from '../dtos/import.response.dto';
import { ImportService } from '../services/import.service';

const importService = new ImportService();
// @UseBefore(
//   (_req: Request, _res: Response, next: NextFunction) => {
//     console.log('Before');
//     next();
//   },
//   (_req: Request, _res: Response, next: NextFunction) => {
//     console.log('Before');
//     next();
//   },
// )

@OpenAPI({
  security: [{ jwt: [] }],
})
@JsonController('/import')
export class ImportController {
  @Get('/:id')
  @OpenAPI({
    summary: 'Return a single import',
  })
  @ResponseSchema(ImportResponse)
  getOne(@Param('id') id: string) {
    console.log('id', id);
    return {
      importId: 1,
      status: 'OK',
      errors: {
        line: 0,
        messages: '',
      },
    };
  }

  @Post('/')
  @OpenAPI({ summary: 'Create a new import' })
  async createImportFile(@Body({ validate: false }) body: CreateImportBody) {
    const { id, status } = await importService.createImport(body);
    return { id, status };
  }
}
