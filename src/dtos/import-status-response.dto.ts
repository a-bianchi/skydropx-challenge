import { IsArray, IsString } from 'class-validator';
import { ErrorDetails } from '../types';

export class ImportStatusResponse {
  @IsString()
  importId: string;

  @IsString()
  status: string;

  @IsArray()
  errors: ErrorDetails[] = [];
}
