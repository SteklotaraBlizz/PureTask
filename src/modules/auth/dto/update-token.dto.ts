import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateRefreshAccess {
  @IsString()
  @ApiProperty()
  public refreshToken: string;

  @IsString()
  @ApiProperty()
  public accessToken: string;

  constructor(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}
