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
import { nanoid } from 'nanoid';

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
    const user = this.repo.create({ email, password, id: `user_${nanoid()}` });

    return await this.repo.save(user);
  }

  async find(email: string) {
    const user = await this.repo.findOne({ where: { email } });

    return user;
  }

  async signUp(email: string, password: string): Promise<ApiResponse> {
    const user = await this.find(email);

    if (user?.id) {
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
      throw new NotFoundException('user not found :(');
    }

    const passwordIsMatch = await bcrypt.compare(password, user?.password);

    if (!passwordIsMatch) {
      throw new NotFoundException('user not found :(');
    }

    return {
      object: 'user.loggedIn',
      status: true,
      data: { id: user?.id, email: user.email },
    };
  }

  /**
   * generates random email and password for a user.
   */
  async createFakeUser() {
    const user = this.repo.create({
      id: `user_${nanoid()}`,
      isFake: true,
      email: `${nanoid()}@gmail.com`,
      password: `pass_${nanoid()}`,
    });

    return await this.repo.save(user);
  }

  async removeFakeUser(id: string) {
    const user = await this.repo.findOne({ where: { id } });

    if (!user?.id) throw new NotFoundException('USER TO BE DELETED NOT FOUND');

    if (!user?.isFake)
      throw new BadRequestException('CANNOT DELETE A REAL USER');

    const del = await this.repo.delete({ id });

    console.log({ del });
    return del;
  }
}
