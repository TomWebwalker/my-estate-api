import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { Roles } from './decorators';
import { UserRole } from './enums';
import { PaginationArgs } from '../shared/dto';
import { CreateAdminUserInput, UserRows } from './dto';
import { toPagination } from '../shared/utils';
import { UpdateAdminUserInput } from './dto/update-admin-user.input';

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

  @Query(() => User, { nullable: true })
  @Roles(UserRole.USER)
  user(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  @Roles(UserRole.USER)
  userCreate(@Args('adminUser') adminUser: CreateAdminUserInput) {
    return this.usersService.create(
      adminUser,
      adminUser.role,
      adminUser.active,
    );
  }

  @Mutation(() => Boolean)
  @Roles(UserRole.USER)
  userUpdate(@Args('adminUser') adminUser: UpdateAdminUserInput) {
    return this.usersService.update(adminUser);
  }

  @Mutation(() => Boolean)
  @Roles(UserRole.USER)
  userDelete(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.delete(id);
  }
}
