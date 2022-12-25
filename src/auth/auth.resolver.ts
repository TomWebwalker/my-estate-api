import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { RegisterUserInput } from './dto/register-user.input';
import { LoginUserInput } from './dto/login-user.input';
import { AuthService } from './auth.service';
import { AccessToken } from './dto/access-token.object-type';

@Resolver(() => User)
export class AuthResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Mutation(() => User)
  register(@Args('registerInput') registerInput: RegisterUserInput) {
    return this.usersService.create(registerInput);
  }

  @Mutation(() => AccessToken, { nullable: true })
  login(@Args('loginInput') loginInput: LoginUserInput) {
    return this.authService.validateUser(loginInput.email, loginInput.password);
  }

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
