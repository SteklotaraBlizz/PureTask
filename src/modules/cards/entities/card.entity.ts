import { ApiProperty } from '@nestjs/swagger';
import { AppBaseEntity } from 'src/modules/base/base.entity';
import { ColumnEntity } from 'src/modules/columns/entities/column.entity';
import { Column, JoinColumn, ManyToOne } from 'typeorm';

export class CardEntity extends AppBaseEntity {
  @ApiProperty({ type: () => ColumnEntity })
  @ManyToOne(() => ColumnEntity)
  @JoinColumn({ name: 'userId' })
  public column!: ColumnEntity;

  @ApiProperty()
  @Column({ name: 'userId' })
  public columnId!: string;
}
