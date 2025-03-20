import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import { printSchema } from 'graphql';
import { writeFileSync } from 'fs';

@Module({
  imports: [
    // Загрузка переменных окружения
    ConfigModule,
    // Подключение базы данных
    DatabaseModule,
    // Функциональные модули
    UsersModule,
    AuthModule,
    // Комментарии
    CommentsModule,
    // Конфигурация GraphQL
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      sortSchema: true,
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
      },
      transformSchema: (schema) => {
        console.log(printSchema(schema));
        writeFileSync('./schema.graphql', printSchema(schema));
        return schema;
      },
      context: ({ req }) => ({ req }),
      playground: true,
    }),
  ],
})
export class AppModule {}
