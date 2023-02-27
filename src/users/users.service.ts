import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto';
import { User } from './entities/user.entity';
import { UserRole } from './enums';
import { SortDir } from '../shared/dto';
import { UpdateAdminUserInput } from './dto/update-admin-user.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(
    createUserInput: CreateUserInput,
    role: UserRole = UserRole.USER,
    active = false,
  ): Promise<User> {
    const password = await bcrypt.hash(createUserInput.password, 10);
    return await this.usersRepository.save({
      password,
      ...createUserInput,
      role,
      active,
    });
  }

  async update(user: UpdateAdminUserInput): Promise<boolean> {
    delete user.email;
    return await this.usersRepository
      .update(user.id, user)
      .then((result) => result.affected > 0);
  }

  async delete(id: number): Promise<boolean> {
    return await this.usersRepository
      .delete(id)
      .then((result) => result.affected > 0);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({
      where: {
        email,
      },
    });
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne({ where: { id } });
  }

  getRows(
    take: number,
    skip: number,
    sortDir: SortDir = SortDir.ASC,
    sortBy?: string,
  ): Promise<[User[], number]> {
    let order = {};
    const sortableColumns = ['id', 'name', 'email'];
    if (sortBy && sortableColumns.includes(sortBy)) {
      order = { [sortBy]: sortDir };
    }
    return this.usersRepository.findAndCount({
      take,
      skip,
      order,
    });
  }
}
