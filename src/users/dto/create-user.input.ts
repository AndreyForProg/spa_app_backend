import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field({ nullable: true })
  @IsNotEmpty({ message: 'Username cannot be empty' })
  username?: string;

  @Field()
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @Field({ nullable: true })
  role?: string;
}
