import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length, Min } from 'class-validator';

export class CreateCommentRequest {
  @ApiProperty()
  @IsNumber()
  @Min(1)
  public columnId: number;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  public cardId: number;

  @ApiProperty()
  @IsString()
  @Length(1, 512)
  public field: string;
}
