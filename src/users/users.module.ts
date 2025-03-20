import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { UserRepository } from './user.repository';
@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [UsersService, UsersResolver, UserRepository],
  exports: [UsersService, UserRepository],
})
export class UsersModule {}
