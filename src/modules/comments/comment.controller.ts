import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('comments')
@ApiTags('Comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

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
