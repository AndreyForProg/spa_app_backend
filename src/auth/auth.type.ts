import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../users/user.model';

@ObjectType()
export class AuthPayload {
  @Field()
  access_token: string;

  @Field()
  refresh_token: string;

  @Field(() => User)
  user: User;
}
