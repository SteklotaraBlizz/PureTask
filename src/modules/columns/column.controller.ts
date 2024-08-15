import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ColumnService } from './column.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('columns')
@ApiTags('Columns')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

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
