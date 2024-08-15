import { CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { ExtractJwt } from 'passport-jwt';
import { MainException } from 'src/exceptions/main.exception';
import { AuthService } from '../../auth.service';

export class JWTAuthGuard implements CanActivate {
  constructor(
    @Inject(AuthService)
    protected authService: AuthService,
  ) {}

  public async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const xAuthTokenJwtParser = ExtractJwt.fromHeader('x-auth-token');
    const authorizationJwtParser = ExtractJwt.fromAuthHeaderAsBearerToken();
    const token =
      xAuthTokenJwtParser(request) || authorizationJwtParser(request);

    if (!token)
      throw MainException.unauthorized(
        'x-auth-token/Authorization is not provided',
      );

    request.user = await this.authService.provideUser(token);

    return request;
  }
}
