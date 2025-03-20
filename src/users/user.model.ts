import {
  Column,
  Model,
  Table,
  DataType,
  BeforeUpdate,
  BeforeCreate,
} from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType() // GraphQL декоратор
@Table
export class User extends Model<User> {
  // Обязательно указывайте тип модели
  @Field(() => ID) // GraphQL ID
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Field() // GraphQL String
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  declare username: string;

  @Field() // GraphQL String
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @Field()
  @Column({
    type: DataType.ENUM('user', 'admin'),
    defaultValue: 'user',
  })
  declare role: string;

  // Метод для защиты пароля
  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(user: User): Promise<void> {
    if (!user.password) {
      throw new Error('Password cannot be empty');
    }
    user.password = await bcrypt.hash(user.password, 10);
  }

  // Метод для проверки пароля
  async comparePassword(
    candidatePassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    if (!candidatePassword || !hashedPassword) {
      throw new Error('Invalid credentials: missing password');
    }
    return bcrypt.compare(candidatePassword, hashedPassword);
  }
}
