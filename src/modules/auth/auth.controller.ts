import {
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  Req,
  UseFilters,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UpdateRefreshAccess } from './dto/update-token.dto';
import { AuthRequest, LoginRequest } from './dto/auth.dto';
import { AppAuthGuard } from './guards/guards/appAuth.guard';
import { RequestWithUser } from './types/request-with-user.type';
import { ApiTags } from '@nestjs/swagger';
import { MainExceptionFilter } from '../../exceptions/main-exception.filter';
import { ValidationPipe } from '../../pipes/validation.pipe';

@Controller('auth')
@ApiTags('Auth')
@UseFilters(MainExceptionFilter)
@UsePipes(ValidationPipe)
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
