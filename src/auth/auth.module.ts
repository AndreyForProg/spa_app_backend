import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthResolver } from './auth.resolver';
import { ConfigService } from '../config/config.service';
import { ConfigModule } from '../config/config.module';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.jwtSecret,
          signOptions: {
            expiresIn: configService.jwtExpiresIn,
          },
        };
      },
    }),
  ],
  providers: [AuthService, JwtStrategy, AuthResolver, UsersService],
  exports: [AuthService],
})
export class AuthModule {}
