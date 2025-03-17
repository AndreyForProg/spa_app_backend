import { ObjectType, Field } from '@nestjs/graphql';
import { UserType } from '../users/dto/user.type';

@ObjectType()
export class AuthPayload {
  @Field()
  access_token: string;

  @Field()
  refresh_token: string;

  @Field(() => UserType)
  user: UserType;
}
