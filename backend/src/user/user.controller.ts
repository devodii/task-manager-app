import { Body, Controller, Delete, Get, Headers, Post } from '@nestjs/common';
import { CreateUserDto as UserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('whoAmI')
  async whoAmI(@Headers('SessionId') userId: string) {
    if (userId.length < 4) return;

    const user = await this.userService.findOne(userId);

    return user;
  }

  @Post('signUp')
  async signUp(@Body() dto: UserDto) {
    const { email, password } = dto;
    const user = await this.userService.signUp(email, password);

    return user;
  }

  @Post('signIn')
  async signIn(@Body() dto: UserDto) {
    const { email, password } = dto;

    return await this.userService.signIn(email, password);
  }

  @Post('create-fake-user')
  async createFakeUser() {
    return await this.userService.createFakeUser();
  }

  @Delete('remove-fake-user')
  async removeFakeUser(@Body('userId') userId: string) {
    console.log({ userId });
    return await this.userService.removeFakeUser(userId);
  }
}
