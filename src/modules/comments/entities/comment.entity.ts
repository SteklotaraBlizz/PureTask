import { ApiProperty } from '@nestjs/swagger';
import { AppBaseEntity } from '../../../modules/base/base.entity';
import { CardEntity } from '../../../modules/cards/entities/card.entity';
import { Column, JoinColumn, ManyToOne } from 'typeorm';

export class CommentEntity extends AppBaseEntity {
  @ApiProperty({ type: () => CardEntity })
  @ManyToOne(() => CardEntity)
  @JoinColumn({ name: 'userId' })
  public card!: CardEntity;

  @ApiProperty()
  @Column({ name: 'userId' })
  public cardId!: string;
}
