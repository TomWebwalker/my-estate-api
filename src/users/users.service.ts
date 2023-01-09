import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserRole } from './enums';
import { SortDir } from '../shared/dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const password = await bcrypt.hash(createUserInput.password, 10);
    return await this.usersRepository.save({
      ...createUserInput,
      password,
      role: UserRole.USER,
      active: false,
    });
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
