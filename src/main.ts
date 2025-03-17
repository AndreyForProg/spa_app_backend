import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Глобальные пайпы для валидации данных
  app.useGlobalPipes(new ValidationPipe());

  // Настройка CORS при необходимости
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
