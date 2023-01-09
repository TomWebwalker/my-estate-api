import { Args, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { Roles } from './decorators';
import { UserRole } from './enums';
import { PaginationArgs } from '../shared/dto';
import { UserRows } from './dto';
import { toPagination } from '../shared/utils';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => UserRows)
  @Roles(UserRole.USER)
  users(@Args() { limit, offset, sortBy, sortDir }: PaginationArgs) {
    return this.usersService
      .getRows(limit, offset, sortDir, sortBy)
      .then(toPagination);
  }
}
