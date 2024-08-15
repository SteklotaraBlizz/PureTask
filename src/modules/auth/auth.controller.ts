import { Controller, Delete, Patch, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp() {}

  @Post('login')
  async logIn() {}

  @Patch('refresh')
  async refresh() {}

  @Delete('logout')
  async logOut() {}
}
