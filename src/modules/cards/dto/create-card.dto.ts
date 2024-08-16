import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length, Min } from 'class-validator';

export class CreateCardRequest {
  @ApiProperty()
  @IsNumber()
  @Min(1)
  public columnId: number;

  @ApiProperty()
  @IsString()
  @Length(1, 128)
  public name: string;
}
