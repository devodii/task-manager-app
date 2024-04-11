import { Body, Controller, Get, Post, Session } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto as UserDto } from './dto/create-user.dto';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('whoAmI')
  async whoAmI(@Session() session: Record<string, any>) {
    console.log([session]);

    return await this.userService.whoAmI();
  }

  @Post('signUp')
  async signUp(@Body() dto: UserDto) {
    console.log('Attempt to sign up', { dto });
    const { email, password } = dto;
    return await this.userService.signUp(email, password);
  }

  // @Post('signIn')
  // async signIn(@Body() dto: UserDto) {
  //   return await this.accessService.signIn(dto);
  // }
}
