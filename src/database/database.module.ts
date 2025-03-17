import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigService } from '../config/config.service';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [
    ConfigModule,
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.dbHost || 'localhost',
        port: configService.dbPort || 5432,
        username: configService.dbUsername || 'postgres',
        password: configService.dbPassword || 'zenpass',
        database: configService.dbName || 'test',
        autoLoadModels: true,
        synchronize: true, // В production рекомендуется отключить
        logging: process.env.NODE_ENV !== 'production',
      }),
    }),
  ],
})
export class DatabaseModule {}
