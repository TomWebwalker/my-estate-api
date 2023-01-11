import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RegisterUserInput } from './dto/register-user.input';
import { LoginUserInput } from './dto/login-user.input';
import { AuthService } from './auth.service';
import { AccessToken } from './dto/access-token.object-type';
import { CurrentUser } from './decorators/current-user';
import { IsPublic } from '../core/enums';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Resolver(() => User)
export class AuthResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Mutation(() => User)
  @IsPublic(true)
  register(@Args('registerInput') registerInput: RegisterUserInput) {
    return this.usersService.create(registerInput);
  }

  @Mutation(() => AccessToken)
  @IsPublic(true)
  login(@Args('loginInput') loginInput: LoginUserInput) {
    return this.authService.validateUser(loginInput.email, loginInput.password);
  }

  @Query(() => User)
  profile(@CurrentUser() user: User): User {
    return user;
  }
}
