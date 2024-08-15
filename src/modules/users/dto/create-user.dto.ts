import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsEmail,
  IsNumber,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class CreateUserRequest {
  @IsDefined()
  @IsString()
  @IsEmail()
  @ApiProperty()
  public email: string;

  @IsDefined()
  @IsString()
  @IsStrongPassword(
    { minLength: 8, minNumbers: 1, minUppercase: 1, minSymbols: 0 },
    {
      message:
        'Password must be min 8 symbols, 1 number and 1 uppercase symbol',
    },
  )
  @ApiProperty()
  public password: string;

  @IsString()
  @ApiProperty()
  @Length(1, 50)
  public nickname: string;

  @IsNumber()
  @ApiProperty()
  public age: number;
}
