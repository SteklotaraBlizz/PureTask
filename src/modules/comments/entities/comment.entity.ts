import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AppBaseEntity } from '../../../modules/base/base.entity';
import { CardEntity } from '../../../modules/cards/entities/card.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ColumnEntity } from '../../../modules/columns/entities/column.entity';
import { UserEntity } from '../../../modules/users/entity/user.entity';

@Entity('comments')
export class CommentEntity extends AppBaseEntity {
  @ApiProperty({ type: () => CardEntity })
  @ManyToOne(() => CardEntity)
  @JoinColumn({ name: 'cardId' })
  public card!: CardEntity;

  @ApiProperty()
  @Column({ name: 'cardId' })
  public cardId!: number;

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
  @Column({ name: 'field', type: 'varchar', length: 512 })
  public field: string;
}
