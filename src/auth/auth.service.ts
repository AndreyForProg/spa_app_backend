import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';
import { ConfigService } from '../config/config.service';
import { JwtPayload } from '../common/interfaces/jwt-payload.interface';
import { User } from '../users/user.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return null;
    }

    const isPasswordValid = await user.comparePassword(
      password,
      user.dataValues.password,
    );

    if (!isPasswordValid) {
      return null;
    }

    const { password: _, ...result } = user.toJSON();
    return result as User;
  }

  async login(loginInput: LoginInput) {
    const user = await this.validateUser(loginInput.email, loginInput.password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateTokens(user);
  }

  async register(registerInput: RegisterInput): Promise<User> {
    try {
      const user = await this.usersService.create(registerInput);

      // Не возвращаем пароль в результате
      const { password: _, ...result } = user.toJSON();
      return result as User;
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new BadRequestException(
          'User with this username or email already exists',
        );
      }
      throw error;
    }
  }

  generateTokens(user: any) {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, {
        expiresIn: this.configService.jwtRefreshExpiresIn,
      }),
      user,
    };
  }

  async refreshTokens(refreshToken: string) {
    try {
      // Проверяем валидность refresh токена
      const payload = this.jwtService.verify(refreshToken);

      // Получаем пользователя
      const user = await this.usersService.findOne(payload.sub);

      // Генерируем новые токены
      return this.generateTokens(user);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
