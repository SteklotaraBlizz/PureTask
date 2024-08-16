import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnService } from './column.service';
import { ColumnController } from './column.controller';
import { ColumnEntity } from './entities/column.entity';
import { AuthModule } from '../auth/auth.module';
import { CardModule } from '../cards/card.module';
import { CommentModule } from '../comments/comment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ColumnEntity]),
    forwardRef(() => AuthModule),
    CardModule,
    CommentModule,
  ],
  providers: [ColumnService],
  controllers: [ColumnController],
  exports: [ColumnService],
})
export class ColumnModule {}
