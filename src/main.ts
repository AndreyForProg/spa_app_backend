import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { GraphQLSchemaFactory } from '@nestjs/graphql';
import { printSchema } from 'graphql';
import * as fs from 'fs';
import { CommentsResolver } from './comments/comments.resolver';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Глобальные пайпы для валидации данных
  app.useGlobalPipes(new ValidationPipe());

  // Настройка CORS при необходимости
  app.enableCors();

  const gqlSchemaFactory = app.get(GraphQLSchemaFactory);
  const schema = await gqlSchemaFactory.create([CommentsResolver]);
  fs.writeFileSync('./src/schema.gql', printSchema(schema));

  await app.listen(3003);
}
bootstrap();
