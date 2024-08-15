import { ApiProperty } from '@nestjs/swagger';

export class AppStatusResponse {
  @ApiProperty()
  public status: boolean;

  constructor(status: boolean) {
    this.status = status;
  }
}
