import { ApiProperty } from '@nestjs/swagger';
import { AppBaseEntity } from 'src/modules/base/base.entity';
import { UserEntity } from 'src/modules/users/entity/user.entity';
import { Column, JoinColumn, ManyToOne } from 'typeorm';

export class ColumnEntity extends AppBaseEntity {
  @ApiProperty({ type: () => UserEntity })
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  public user!: UserEntity;

  @ApiProperty()
  @Column({ name: 'userId' })
  public userId!: string;

  @ApiProperty()
  @Column({ name: 'name', type: 'varchar' })
  public name: string;
}
