import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { RegisterUserInput } from './dto/register-user.input';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  register(@Args('registerInput') registerInput: RegisterUserInput) {
    return this.usersService.create(registerInput);
  }

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
