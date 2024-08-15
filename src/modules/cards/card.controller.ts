import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseFilters,
  UsePipes,
} from '@nestjs/common';
import { CardService } from './card.service';
import { ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { MainExceptionFilter } from '../../exceptions/main-exception.filter';
import { AppAuthGuard } from '../auth/guards/guards/appAuth.guard';

@Controller('cards')
@ApiTags('Cards')
@UseFilters(MainExceptionFilter)
@UsePipes(ValidationPipe)
@AppAuthGuard()
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post('create')
  async create() {}

  @Get(':id')
  async getOne() {}

  @Get()
  async getAll() {}

  @Patch(':id')
  async update() {}

  @Delete(':id')
  async delete() {}
}
