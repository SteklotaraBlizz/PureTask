import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { CardService } from './card.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('cards')
@ApiTags('Cards')
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
