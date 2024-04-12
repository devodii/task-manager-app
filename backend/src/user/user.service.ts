import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

import * as bcrypt from 'bcrypt';
import { ApiResponse } from 'src/types';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async findOne(id: string) {
    const user = await this.repo.findOne({ where: { id } });

    if (!user?.id) {
      throw new NotFoundException('USER NOT FOUND!');
    }

    return user;
  }
  async create(email: string, password: string) {
    const user = this.repo.create({ email, password });

    return await this.repo.save(user);
  }

  async find(email: string) {
    const user = await this.repo.findOne({ where: { email } });

    return user;
  }

  // auth related stuff.
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

  async signIn(email: string, password: string): Promise<ApiResponse> {
    const user = await this.find(email);

    if (!user?.id) {
      throw new BadRequestException('USER DOES NOT EXISTS!');
    }

    const passwordIsMatch = await bcrypt.compare(password, user?.password);

    if (!passwordIsMatch) {
      throw new BadRequestException('USER DOES NOT EXISTS!');
    }

    return {
      object: 'user.loggedIn',
      status: true,
      data: { id: user?.id, email: user.email },
    };
  }
}
