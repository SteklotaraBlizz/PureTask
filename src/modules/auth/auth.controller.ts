import { Body, Controller, Delete, Patch, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UpdateRefreshAccess } from './dto/update-token.dto';
import { AuthRequest, LoginRequest } from './dto/auth.dto';
import { AppAuthGuard } from './guards/guards/appAuth.guard';
import { RequestWithUser } from './types/request-with-user.type';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async auth(@Body() req: AuthRequest) {
    return this.authService.signUp(req);
  }

  @Post('login')
  async login(@Body() req: LoginRequest) {
    return this.authService.login(req);
  }

  @AppAuthGuard()
  @Delete('logout')
  async logout(@Req() req: RequestWithUser) {
    return this.authService.logout(req.user.email);
  }

  @Patch('refresh')
  async refreshTokens(@Body() body: UpdateRefreshAccess) {
    return this.authService.refreshTokens(body);
  }
}
