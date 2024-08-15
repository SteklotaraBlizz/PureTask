import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
