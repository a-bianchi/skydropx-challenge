import { IsNotEmpty } from 'class-validator';

export class CreateImportBody {
  @IsNotEmpty()
  file: string;
}
