import {
  Column,
  Model,
  Table,
  DataType,
  BeforeCreate,
  BeforeUpdate,
} from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';

@Table
export class User extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string = '';

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    set(value: string) {
      const hashedPassword = bcrypt.hashSync(value, 10); // Хешируем перед сохранением
      this.setDataValue('password', hashedPassword); // Сохраняем захешированное значение
    },
  })
  password: string;

  @Column({
    type: DataType.ENUM('user', 'admin'),
    defaultValue: 'user',
  })
  role: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  isActive: boolean;

  // 🔥 Добавляем защиту от пустого пароля
  private static async hashPassword(password: string): Promise<string> {
    if (!password) {
      throw new Error('Password cannot be empty');
    }
    return bcrypt.hash(password, 10);
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
