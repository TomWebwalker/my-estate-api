import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { RegisterUserInput } from './dto/register-user.input';
import { LoginUserInput } from './dto/login-user.input';
import { AuthService } from './auth.service';
import { Res } from '@nestjs/common';
import { Response } from 'express';

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

  @Mutation(() => User)
  async login(
    @Args('loginUser') loginUser: LoginUserInput,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { user, accessToken } = await this.authService.login(
      loginUser.email,
      loginUser.password,
    );
    response.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
    });

    return user;
  }

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
