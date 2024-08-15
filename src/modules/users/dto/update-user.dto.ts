import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserRequest } from './create-user.dto';
import { UserEntity } from '../entity/user.entity';

export class UpdateUserRequest extends PartialType(CreateUserRequest) {}

export class UpdateUserResponse {
  @ApiProperty({ type: UserEntity })
  public user: UserEntity;

  constructor(user: UserEntity) {
    this.user = user;
  }
}
