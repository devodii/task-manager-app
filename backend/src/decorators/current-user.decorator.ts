import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const CurrentUserId = createParamDecorator(
  async (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const userId = await request.headers.sessionid;

    return userId.length > 4 ? (userId as string) : null;
  },
);
