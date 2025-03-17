import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await this.userModel.findOne({ where: { username } });
    return user || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ where: { email } });
    return user || null;
  }

  async create(createUserInput: CreateUserInput): Promise<User> {
    // Проверка существования пользователя с таким email или username
    const existingByEmail = await this.findByEmail(createUserInput.email);
    if (existingByEmail) {
      throw new ConflictException('User with this email already exists');
    }

    const existingByUsername = await this.findByUsername(
      createUserInput.username,
    );
    if (existingByUsername) {
      throw new ConflictException('User with this username already exists');
    }

    return this.userModel.create(createUserInput as any);
  }
}
