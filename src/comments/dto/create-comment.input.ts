import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateCommentInput {
  @Field()
  @IsNotEmpty({ message: 'Юзер должен быть авторизован' })
  userId: string;

  @Field()
  @IsNotEmpty({ message: 'Текст комментария не может быть пустым' })
  text: string;

  @Field({ nullable: true })
  homePage?: string;

  @Field({ nullable: true })
  parentId?: string;

  @Field({ nullable: true })
  filePath?: string;
}
