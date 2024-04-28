import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
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

  /**
   * Returns the current user's workspace.
   */
  @Get()
  async userWorkspace(@CurrentUserId() ownerId: string) {
    const workspace = await this.workspaceService.findUserWorkspace(ownerId);

    if (!workspace?.id) {
      throw new NotFoundException('this user doesnt have a workspace');
    }

    return workspace;
  }

  /**
   * Returns the current user's workspace.
   */
  @Get(':id')
  async findWorkspace(@Param('id') id: string) {
    const workspace = await this.workspaceService.findOne(id);

    if (!workspace?.id) {
      throw new NotFoundException('workspace not found');
    }

    return workspace;
  }

  @Patch('join/:id')
  async addMemberToWorkspace(
    @CurrentUserId() profileId: string,
    @Param('id') workspaceId,
  ) {
    const memberAddedToWorkspace =
      await this.workspaceService.addMemberToWorkspace(profileId, workspaceId);

    console.log({ memberAddedToWorkspace });
    return memberAddedToWorkspace;
  }
}
