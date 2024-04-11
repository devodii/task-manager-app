import { BadRequestException, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

import * as bcrypt from 'bcrypt';
import { ApiResponse } from 'src/types';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async whoAmI() {
    return { name: 'Emmmanel' };
  }

  async create(email: string, password: string) {
    const user = this.repo.create({ email, password });

    return await this.repo.save(user);
  }

  async find(email: string) {
    const user = await this.repo.findOne({ where: { email } });

    return user;
  }

  async signUp(email: string, password: string): Promise<ApiResponse> {
    const user = await this.find(email);
    console.log({ user });

    if (user) {
      throw new BadRequestException('USER ALREADY EXISTS!');
    }

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    const newUser = await this.create(email, hashedPassword);

    return {
      status: true,
      object: 'user.created',
      data: { id: newUser.id, email: newUser.email },
    };
  }
}
