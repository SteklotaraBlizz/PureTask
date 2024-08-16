import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateColumnRequest {
  @IsString()
  @ApiProperty()
  @Length(1, 128)
  public name: string;
}
