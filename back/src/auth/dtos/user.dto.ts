import { IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
