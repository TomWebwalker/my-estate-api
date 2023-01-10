import { CreateUserInput } from './create-user.input';
import { Field, InputType } from '@nestjs/graphql';
import { UserRole } from '../enums';

@InputType()
export class CreateAdminUserInput extends CreateUserInput {
  @Field(() => UserRole)
  role: UserRole;

  @Field()
  active: boolean;
}
