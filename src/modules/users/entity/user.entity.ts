import { ApiProperty } from '@nestjs/swagger';
import { AppBaseEntity } from '../../../modules/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class UserEntity extends AppBaseEntity {
  @ApiProperty()
  @Column({ name: 'email', type: 'varchar', unique: true })
  public email: string;

  @ApiProperty()
  @Column({ name: 'password', type: 'varchar', length: 128 })
  public password!: string;
}
