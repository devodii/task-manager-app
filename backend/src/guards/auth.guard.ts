import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private usersService: UserService) {}

  async canActivate(ctx: ExecutionContext) {
    const request = ctx.switchToHttp().getRequest();

    const sessionId = await request.headers.sessionid;

    if (!sessionId) return false;

    const user = await this.usersService.findOne(sessionId);

    if (!user?.id) return false;

    return true;
  }
}
