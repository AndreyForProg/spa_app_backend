import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './user.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [User])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async users(): Promise<User[]> {
    const users = await this.usersService.findAll();
    return users.map((user) => user);
  }

  @Query(() => User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'user')
  async user(@Args('id') id: string): Promise<User> {
    const user = await this.usersService.findOne(id);
    return user;
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    const user = await this.usersService.create(createUserInput);
    return user;
  }
}
