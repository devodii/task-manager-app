import { BadRequestException } from '@nestjs/common';
import { CreateUserDto as UserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

import * as bcrypt from 'bcrypt';

export class AuthService {
  constructor(private userService: UserService) {}

  async signUp(email: string, password: string) {
    const user = await this.userService.find(email);

    if (user?.id) {
      throw new BadRequestException('USER ALREADY EXISTS!');
    }

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    return await this.userService.create(email, hashedPassword);
  }

  async signIn(dto: UserDto) {
    return dto;
  }
}
