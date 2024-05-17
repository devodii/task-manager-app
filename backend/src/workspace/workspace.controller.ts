import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { CurrentUserId } from 'src/decorators/current-user.decorator';
import { CreateWorkspaceDTO } from './dto/create-workspace.dto';
import { UpdateWorkspaceDTO } from './dto/update-workspace.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('workspace')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createWorkspace(
    @CurrentUserId() userId: string,
    @Body() dto: CreateWorkspaceDTO,
  ) {
    return await this.workspaceService.create(userId, dto.name);
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

  @Get('members')
  async getWorkspaceMembers(@Query('workspaceId') workspaceId: string) {
    const members =
      await this.workspaceService.listWorkspaceMembers(workspaceId);

    return members;
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

  @Patch(':id')
  @UseGuards(AuthGuard)
  async updateWorkspace(
    @CurrentUserId() userId: string,
    @Body() dto: UpdateWorkspaceDTO,
  ) {
    const { id, name } = dto;

    return await this.workspaceService.update(id, name);
  }

  @Patch('join/:id')
  @UseGuards(AuthGuard)
  async addMemberToWorkspace(
    @CurrentUserId() profileId: string,
    @Param('id') workspaceId: string,
  ) {
    const memberAddedToWorkspace =
      await this.workspaceService.addMemberToWorkspace(profileId, workspaceId);

    return memberAddedToWorkspace;
  }
}
