import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateAdminUserInput } from './create-admin-user.input';

@InputType()
export class UpdateAdminUserInput extends PartialType(CreateAdminUserInput) {
  @Field(() => Int)
  id: number;
}
