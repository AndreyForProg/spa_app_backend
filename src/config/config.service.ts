import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private configService: NestConfigService) {}

  get jwtSecret(): string {
    const secret =
      this.configService.get('JWT_SECRET') || 'hard-to-guess-secret';
    return secret;
  }

  get jwtExpiresIn(): string {
    return this.configService.get('JWT_EXPIRES_IN') || '1h';
  }

  get jwtRefreshExpiresIn(): string {
    return this.configService.get('JWT_REFRESH_EXPIRES_IN') || '7d';
  }

  get dbHost(): string {
    return this.configService.get('DB_HOST') || 'localhost';
  }

  get dbPort(): number {
    return this.configService.get('DB_PORT') || 5432;
  }

  get dbUsername(): string {
    return this.configService.get('DB_USER') || 'zen';
  }

  get dbPassword(): string {
    return this.configService.get('DB_PASSWORD') || 'zenpass';
  }

  get dbName(): string {
    return this.configService.get('DB_NAME') || 'test_db';
  }
}
