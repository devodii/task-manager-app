import { Body, Controller, Get, NotFoundException, Post } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { CurrentUserId } from 'src/decorators/current-user.decorator';

// todo: add auth guard
@Controller('workspace')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Post()
  async createWorkspace(
    @CurrentUserId() userId: string,
    @Body('name') name: string,
  ) {
    return await this.workspaceService.create(userId, name);
  }

  @Get()
  async test(@CurrentUserId() ownerId: string) {
    const workspace = await this.workspaceService.findUserWorkspace(ownerId);

    if (!workspace?.id) {
      throw new NotFoundException('this user doesnt have a workspace');
    }

    return workspace;
  }
}
