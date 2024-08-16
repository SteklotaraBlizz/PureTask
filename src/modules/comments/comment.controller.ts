import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateCommentRequest } from './dto/create-comment.dto';
import { RequestWithUser } from '../auth/types/request-with-user.type';
import { UpdateCommentRequest } from './dto/update-comment.dto';

@Controller('comments')
@ApiTags('Comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('create')
  async create(
    @Body() request: CreateCommentRequest,
    @Req() req: RequestWithUser,
  ) {
    return this.commentService.create(request, req.user.id);
  }

  @Get(':id')
  async getOne(
    @Param('id', ParseIntPipe) id: number,
    @Query('columnId') columnId: number,
    @Query('cardId') cardId: number,
    @Req() req: RequestWithUser,
  ) {
    return this.commentService.fidnOne(id, cardId, columnId, req.user.id);
  }

  @Get()
  async getAll(@Req() req: RequestWithUser) {
    return this.commentService.fidnAll(req.user.id);
  }

  @Patch(':id')
  async update(
    @Body() request: UpdateCommentRequest,
    @Param('id', ParseIntPipe) id: number,
    @Query('columnId') columnId: number,
    @Query('cardId') cardId: number,
    @Req() req: RequestWithUser,
  ) {
    return this.commentService.update(
      request,
      id,
      columnId,
      cardId,
      req.user.id,
    );
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: RequestWithUser,
  ) {
    return this.commentService.delete(id, req.user.id);
  }
}
