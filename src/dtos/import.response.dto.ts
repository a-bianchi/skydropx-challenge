import { IsString } from 'class-validator';

export class ImportResponse {
  @IsString()
  importId: string;
}
