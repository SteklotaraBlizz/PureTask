import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseFilters,
  UsePipes,
} from '@nestjs/common';
import { ColumnService } from './column.service';
import { ApiTags } from '@nestjs/swagger';
import { RequestWithUser } from '../auth/types/request-with-user.type';
import { CreateColumnRequest } from './dto/create-column.dto';
import { UpdateColumnRequest } from './dto/update-column.dto';
import { MainExceptionFilter } from 'src/exceptions/main-exception.filter';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { AppAuthGuard } from '../auth/guards/guards/appAuth.guard';

@Controller('columns')
@ApiTags('Columns')
@UseFilters(MainExceptionFilter)
@UsePipes(ValidationPipe)
@AppAuthGuard()
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @Post('create')
  async create(
    @Req() req: RequestWithUser,
    @Body() request: CreateColumnRequest,
  ) {
    return this.columnService.create(request, req.user.id);
  }

  @Get(':id')
  async getOne(
    @Req() req: RequestWithUser,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.columnService.getOne(id, req.user.id);
  }

  @Get()
  async getAll(@Req() req: RequestWithUser) {
    return this.columnService.getAll(req.user.id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: RequestWithUser,
    @Body() request: UpdateColumnRequest,
  ) {
    return this.columnService.update(id, request, req.user.id);
  }

  @Delete(':id')
  async delete(
    @Req() req: RequestWithUser,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.columnService.delete(id, req.user.id);
  }
}
