import { CsvFileImporter } from './csv-file-importer.service';

export interface FileImporter {
  importFile(fileName: string): void;
}

const MimeTypeMap = {
  'text/csv': CsvFileImporter,
} as const;

export type MimeTypes = keyof typeof MimeTypeMap; // 'text/csv'
export type userTypes = typeof MimeTypeMap[MimeTypes]; //typeof CsvFileImport
type ExtractInstanceType<T> = T extends new () => infer R ? R : never;

export abstract class FileImporterFactory {
  static getFileImporter(k: MimeTypes): ExtractInstanceType<userTypes> {
    return new MimeTypeMap[k]();
  }
}
