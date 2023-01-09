import { ObjectType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { Paginated } from '../../shared/abstract';

@ObjectType()
export class UserRows extends Paginated(User) {}
