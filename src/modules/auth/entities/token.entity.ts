import { ApiProperty } from '@nestjs/swagger';
import { AppBaseEntity } from '../../../modules/base/base.entity';
import { UserEntity } from '../../../modules/users/entity/user.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity('tokens')
export class TokenEntity extends AppBaseEntity {
  @ApiProperty({ type: () => UserEntity })
  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  public user?: UserEntity;

  @ApiProperty()
  @Column({ name: 'userId', nullable: true })
  public userId?: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 256 })
  public hash: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
    length: 256,
  })
  public refreshHash: string;
}
