import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenEntity } from './entities/token.entity';
import { Repository } from 'typeorm';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcrypt';
import { AuthRequest, AuthResponse, LoginRequest } from './dto/auth.dto';
import { UpdateRefreshAccess } from './dto/update-token.dto';
import { MainException } from 'src/exceptions/main.exception';
import { AppStatusResponse } from 'src/dto/app-status-response.dto';
import { AppSingleResponse } from 'src/dto/app-single-response.dto';
import { UserEntity } from '../users/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>,
  ) {}

  async signUp(request: AuthRequest): Promise<AppSingleResponse<UserEntity>> {
    return this.userService.create(request);
  }

  async login(request: LoginRequest): Promise<AuthResponse> {
    try {
      const { data: user } = await this.userService.getUserByEmail(
        request.email.toLowerCase(),
      );
      const passwordMatches = await bcrypt.compare(
        request.password,
        user.password,
      );
      if (!passwordMatches)
        throw MainException.forbidden('Incorrect email or password');

      const tokens = await this.getTokens(user.id, user.email);

      await this.updateRefreshHash(
        user.id,
        tokens.accessToken,
        tokens.refreshToken,
      );
      return tokens;
    } catch {
      throw MainException.forbidden('Incorrect email or password');
    }
  }

  async refreshTokens(request: UpdateRefreshAccess): Promise<AuthResponse> {
    const refreshToken = await this.jwtService.verifyAsync(
      request.refreshToken,
      {
        secret: process.env.JWT_REFRESH_SECRET,
        publicKey: process.env.JWT_PUBLIC_KEY,
      },
    );
    if (!refreshToken || !refreshToken?.email)
      throw MainException.invalidData('Invalid token provided');

    const { data: token } = await this.getTokenByUserEmail(refreshToken.email);

    const refreshMatches = await bcrypt.compare(
      request.refreshToken,
      token!.refreshHash,
    );
    const accessMatches = await bcrypt.compare(
      request.accessToken,
      token!.hash,
    );

    const { data: user } = await this.userService.getUserByEmail(
      refreshToken.email,
    );

    if (!refreshMatches || !accessMatches)
      throw MainException.forbidden(
        `Failed to refresh access: current tokens for user ${user.id} don't match`,
      );

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshHash(
      user.id,
      tokens.accessToken,
      tokens.refreshToken,
    );

    return tokens;
  }

  async logout(email: string): Promise<AppStatusResponse> {
    const { data: token } = await this.getTokenByUserEmail(email.toLowerCase());
    const { data: user } = await this.userService.getUserByEmail(email);
    if (!token || token.refreshHash == null || token.hash == null)
      throw MainException.unauthorized(`Unauthorized user with id ${user.id}`);
    const { affected } = await this.tokenRepository.delete(token.id!);
    return new AppStatusResponse(!!affected);
  }

  async provideUser(jwt: string) {
    try {
      const options = {
        secret: process.env.JWT_SECRET,
        publicKey: process.env.JWT_PUBLIC_KEY,
      };

      const decodedToken = await this.jwtService.verifyAsync(jwt, options);
      if (!decodedToken || !decodedToken?.email)
        throw MainException.invalidData('Invalid token provided');

      return (await this.userService.getUserByEmail(decodedToken.email)).data;
    } catch {
      throw MainException.unauthorized(
        'Current token has expired, or has not been provided',
      );
    }
  }

  private async getTokens(
    userId: UserEntity['id'],
    email: string,
  ): Promise<AuthResponse> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: process.env.JWT_EXPIRATION,
        },
      ),

      this.jwtService.signAsync(
        { sub: userId, email },
        {
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: process.env.JWT_REFRESH_EXPIRATION,
        },
      ),
    ]);
    return new AuthResponse(accessToken, refreshToken);
  }

  private async getTokenByUserEmail(email: UserEntity['email']) {
    const { data: user } = await this.userService.getUserByEmail(email);
    const token = await this.tokenRepository.findOne({
      where: {
        userId: user.id,
      },
    });
    if (!token) return this.createTokenForUser(user.email);

    return new AppSingleResponse(token);
  }

  private async updateRefreshHash(
    userId: UserEntity['id'],
    access: string,
    refresh: string,
  ) {
    const { data: user } = await this.userService.getUserById(userId);
    const { data: token } = await this.getTokenByUserEmail(user.email);

    token!.refreshHash = await bcrypt.hash(access, 10);
    token!.hash = await bcrypt.hash(refresh, 10);

    const savedTokens = await this.tokenRepository.save(token);
    if (!savedTokens)
      throw MainException.internalRequestError('Error upon saving token');

    return new AppSingleResponse(savedTokens);
  }

  private async createTokenForUser(email: string) {
    const { data: user } = await this.userService.getUserByEmail(email);
    const newToken = this.tokenRepository.create({
      hash: 'default',
      refreshHash: 'default',
      user: user,
      userId: user.id,
    });
    const savedToken = await this.tokenRepository.save(newToken);
    return new AppSingleResponse(savedToken);
  }
}
