import { UseGuards, applyDecorators } from '@nestjs/common';
import { JWTAuthGuard } from './jwtAuth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

export function AppAuthGuard(...guards: Parameters<typeof UseGuards>) {
  return applyDecorators(
    UseGuards(...(guards.length === 0 ? [JWTAuthGuard] : guards)),
    ApiBearerAuth(),
  );
}
