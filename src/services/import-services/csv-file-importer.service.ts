import { FileImporter } from './file-processor.factory';
import csv2json from 'csvtojson';
import { pipeline } from 'stream';
import { createReadStream } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { ImportService } from '../import.service';
import { CSVTransformer } from './csv-file-transformer.service';

export class CsvFileImporter implements FileImporter {
  private readonly importService: ImportService = new ImportService();
  importFile(fileName: string): void {
    this.importService
      .markImportProcessed(fileName)
      .then()
      .catch((error) => console.error('Error mark import processed', error));
    const csvToJson = csv2json();
    pipeline(createReadStream(join(tmpdir(), fileName)), csvToJson, new CSVTransformer(fileName), (err) => {
      if (err) {
        console.error(err);
      }
    }).on('error', (error) => {
      console.log(error);
    });
  }
}
