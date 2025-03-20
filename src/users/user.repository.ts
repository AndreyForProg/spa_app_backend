import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    return this.userModel.create(createUserInput as any);
  }

  async findOne(where: any): Promise<User | null> {
    return this.userModel.findOne({ where });
  }

  async findByPk(id: string): Promise<User | null> {
    return this.userModel.findByPk(id);
  }
}
