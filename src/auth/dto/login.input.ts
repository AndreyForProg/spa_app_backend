import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class LoginInput {
  @Field()
  @IsNotEmpty({ message: 'Username cannot be empty' })
  username: string;

  @Field()
  @IsNotEmpty({ message: 'Password cannot be empty' })
  password: string;
}
