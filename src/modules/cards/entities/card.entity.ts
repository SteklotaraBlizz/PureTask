import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AppBaseEntity } from '../../../modules/base/base.entity';
import { ColumnEntity } from '../../../modules/columns/entities/column.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from '../../../modules/users/entity/user.entity';

@Entity('cards')
export class CardEntity extends AppBaseEntity {
  @ApiProperty({ type: () => ColumnEntity })
  @ManyToOne(() => ColumnEntity)
  @JoinColumn({ name: 'columnId' })
  public column!: ColumnEntity;

  @ApiProperty()
  @Column({ name: 'columnId' })
  public columnId!: number;

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
