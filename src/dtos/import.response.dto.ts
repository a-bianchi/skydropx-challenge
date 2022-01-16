import { IsObject, IsString } from 'class-validator';

export class ImportResponse {
  @IsString()
  importId: string;

  @IsString()
  status: string;

  @IsObject()
  errors: {
    line: number;
    messages: string;
  };
}
