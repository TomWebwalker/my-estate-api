import { Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { Roles } from './decorators';
import { UserRole } from './enums';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User])
  @Roles(UserRole.ADMIN)
  users() {
    return this.usersService.getAll();
  }
}
