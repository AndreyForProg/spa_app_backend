import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  DataType,
} from 'sequelize-typescript';
import { User } from '../users/user.model';
import { IsUrl } from 'class-validator';

@ObjectType('Comment') // GraphQL декоратор
@Table
export class Comment extends Model<Comment> {
  // Указываем тип для модели
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
    allowNull: false,
  })
  declare text: string;

  @Field(() => String) // Указываем GraphQL String
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare userId: string;

  @Field({ nullable: true }) // nullable для файла
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare filePath?: string;

  @Field({ nullable: true }) // nullable для файла
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  @IsUrl({}, { message: 'Invalid URL format' })
  declare homePage?: string;

  @Field(() => String, { nullable: true }) // nullable для parentId
  @ForeignKey(() => Comment)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  declare parentId?: string;

  @Field(() => Date, { nullable: false })
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  declare createdAt: Date;

  @Field(() => User, { nullable: true })
  @BelongsTo(() => User) // Связь с пользователем
  declare user?: User;

  @Field(() => Comment, { nullable: true })
  @BelongsTo(() => Comment) // Связь с родительским комментарием
  declare parent?: Comment;
}
