import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AppBaseEntity } from '../../../modules/base/base.entity';
import { ColumnEntity } from '../../../modules/columns/entities/column.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('cards')
export class CardEntity extends AppBaseEntity {
  @ApiProperty({ type: () => ColumnEntity })
  @ManyToOne(() => ColumnEntity)
  @JoinColumn({ name: 'userId' })
  public column!: ColumnEntity;

  @ApiProperty()
  @Column({ name: 'userId' })
  public columnId!: number;

  @ApiPropertyOptional()
  @Column({ name: 'name', type: 'varchar', length: 128 })
  public name: string;
}
