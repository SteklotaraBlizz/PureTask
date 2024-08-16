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
  UseFilters,
  UsePipes,
} from '@nestjs/common';
import { CardService } from './card.service';
import { ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { MainExceptionFilter } from '../../exceptions/main-exception.filter';
import { AppAuthGuard } from '../auth/guards/guards/appAuth.guard';
import { CreateCardRequest } from './dto/create-card.dto';
import { RequestWithUser } from '../auth/types/request-with-user.type';
import { UpdateCardRequest } from './dto/update-card.dto';

@Controller('cards')
@ApiTags('Cards')
@UseFilters(MainExceptionFilter)
@UsePipes(ValidationPipe)
@AppAuthGuard()
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post('create')
  async create(
    @Body() request: CreateCardRequest,
    @Req() req: RequestWithUser,
  ) {
    return this.cardService.create(request, req.user.id);
  }

  @Get(':id')
  async getOne(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: RequestWithUser,
  ) {
    return this.cardService.findOne(id, req.user.id);
  }

  @Get()
  async getAll(@Req() req: RequestWithUser) {
    return this.cardService.findAll(req.user.id);
  }

  @Patch(':id')
  async update(
    @Body() request: UpdateCardRequest,
    @Param('id', ParseIntPipe) id: number,
    @Query('columnId') columnId: number,
    @Req() req: RequestWithUser,
  ) {
    return this.cardService.update(request, id, columnId, req.user.id);
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: RequestWithUser,
  ) {
    return this.cardService.delete(id, req.user.id);
  }
}
