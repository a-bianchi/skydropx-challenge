import { IsObject, IsString } from 'class-validator';
import { errorDetails } from '../types';

export class ImportResponse {
  @IsString()
  importId: string;

  @IsString()
  status: string;

  @IsObject()
  errors: errorDetails[] = [];
}
