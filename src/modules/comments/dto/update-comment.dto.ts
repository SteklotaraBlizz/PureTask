import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class UpdateCommentRequest {
  @ApiProperty()
  @IsString()
  @Length(1, 512)
  public field: string;
}
