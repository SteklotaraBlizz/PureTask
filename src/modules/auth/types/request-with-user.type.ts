import { UserEntity } from '../../../modules/users/entity/user.entity';

export interface RequestWithUser extends Request {
  user: UserEntity;
}
