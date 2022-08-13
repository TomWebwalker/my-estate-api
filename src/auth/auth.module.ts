import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthResolver } from './auth.resolver';

@Module({
  providers: [AuthResolver],
  imports: [UsersModule],
})
export class AuthModule {}
