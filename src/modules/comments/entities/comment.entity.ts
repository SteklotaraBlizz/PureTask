import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AppBaseEntity } from '../../../modules/base/base.entity';
import { CardEntity } from '../../../modules/cards/entities/card.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('comments')
export class CommentEntity extends AppBaseEntity {
  @ApiProperty({ type: () => CardEntity })
  @ManyToOne(() => CardEntity)
  @JoinColumn({ name: 'userId' })
  public card!: CardEntity;

  @ApiProperty()
  @Column({ name: 'userId' })
  public cardId!: number;

  @ApiPropertyOptional()
  @Column({ name: 'field', type: 'varchar', length: 512 })
  public field: string;
}
