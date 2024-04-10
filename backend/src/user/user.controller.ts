import { Body, Controller, Get, Post, Session } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { CreateUserDto as UserDto } from './dto/create-user.dto';

@Controller('auth')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService,
  ) {}

  @Get('whoAmI')
  async whoAmI(@Session() session: Record<string, any>) {
    console.log([session]);

    return await this.userService.whoAmI();
  }

  @Post('signUp')
  async signUp(@Body() dto: UserDto) {
    const { email, password } = dto;
    return await this.authService.signUp(email, password);
  }

  @Post('signIn')
  async signIn(@Body() dto: UserDto) {
    return await this.authService.signIn(dto);
  }
}
