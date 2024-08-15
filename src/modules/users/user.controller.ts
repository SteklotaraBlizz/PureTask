import {
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
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { AppAuthGuard } from '../auth/guards/guards/appAuth.guard';
import { MainExceptionFilter } from '../../exceptions/main-exception.filter';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { UpdateUserRequest } from './dto/update-user.dto';
import { CreateUserRequest } from './dto/create-user.dto';

@Controller('users')
@ApiTags('Users')
@UseFilters(MainExceptionFilter)
@UsePipes(ValidationPipe)
@AppAuthGuard()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async create(@Req() req: CreateUserRequest) {
    return this.userService.create(req);
  }

  @Get(':id')
  async getOneById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }

  @Get(':email')
  async getOneByEmail(@Param('email') email: string) {
    return this.userService.getUserByEmail(email);
  }

  @Get()
  async getAll() {
    return this.userService.getUsers();
  }

  @Patch(':id')
  async update(
    @Req() req: UpdateUserRequest,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.updateUser(id, req);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUserById(id);
  }
}
