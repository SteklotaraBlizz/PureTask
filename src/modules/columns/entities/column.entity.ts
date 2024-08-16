import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AppBaseEntity } from '../../../modules/base/base.entity';
import { UserEntity } from '../../../modules/users/entity/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('columns')
export class ColumnEntity extends AppBaseEntity {
  @ApiProperty({ type: () => UserEntity })
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  public user!: UserEntity;

  @ApiProperty()
  @Column({ name: 'userId' })
  public userId!: number;

  @ApiPropertyOptional()
  @Column({ name: 'name', type: 'varchar', length: 128 })
  public name: string;
}
