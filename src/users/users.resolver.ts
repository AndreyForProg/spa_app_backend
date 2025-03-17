import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { UserType } from './dto/user.type';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Resolver(() => UserType)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [UserType])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async users(): Promise<UserType[]> {
    const users = await this.usersService.findAll();
    return users.map((user) => ({
      ...user.toJSON(),
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    }));
  }

  @Query(() => UserType)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'user')
  async user(@Args('id') id: string): Promise<UserType> {
    const user = await this.usersService.findOne(id);
    return {
      ...user.toJSON(),
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  }

  @Mutation(() => UserType)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<UserType> {
    const user = await this.usersService.create(createUserInput);
    return {
      ...user.toJSON(),
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  }
}
