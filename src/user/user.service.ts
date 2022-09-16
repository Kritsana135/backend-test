import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../common/entites/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { fullName, username, password } = createUserDto;

    const user = new User();
    user.fullName = fullName;
    user.username = username;
    user.password = await bcrypt.hash(password, 10);

    return await this.usersRepository.save(user);
  }

  async findOne(username: string) {
    return this.usersRepository.findOneBy({ username });
  }
}
