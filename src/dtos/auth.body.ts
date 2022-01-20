import { IsNotEmpty, IsString } from 'class-validator';

export class AuthBody {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
