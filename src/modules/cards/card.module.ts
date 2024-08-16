import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { CardEntity } from './entities/card.entity';
import { AuthModule } from '../auth/auth.module';
import { CommentModule } from '../comments/comment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CardEntity]),
    forwardRef(() => AuthModule),
    CommentModule,
  ],
  providers: [CardService],
  controllers: [CardController],
  exports: [CardService],
})
export class CardModule {}
