import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnService } from './column.service';
import { ColumnController } from './column.controller';
import { ColumnEntity } from './entities/column.entity';
import { AuthModule } from '../auth/auth.module';
import { CardModule } from '../cards/card.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ColumnEntity]),
    forwardRef(() => AuthModule),
    CardModule,
  ],
  providers: [ColumnService],
  controllers: [ColumnController],
  exports: [ColumnService],
})
export class ColumnModule {}
