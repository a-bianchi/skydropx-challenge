import { IsObject, IsString } from 'class-validator';
import { ErrorDetails } from '../types';

export class ImportResponse {
  @IsString()
  importId: string;

  @IsString()
  status: string;

  @IsObject()
  errors: ErrorDetails[] = [];
}
