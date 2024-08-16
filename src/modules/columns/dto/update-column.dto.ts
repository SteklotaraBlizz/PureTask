import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class UpdateColumnRequest {
  @ApiProperty()
  @IsString()
  @Length(1, 128)
  public name: string;
}
