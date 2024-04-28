import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { nanoid } from 'nanoid';
import { ProfileService } from 'src/profile/profile.service';
import { Repository } from 'typeorm';
import { WorkspaceMember } from './entities/workspace-member.entity';
import { Workspace } from './entities/workspace.entity';

@Injectable()
export class WorkspaceService {
  constructor(
    @InjectRepository(Workspace) private repo: Repository<Workspace>,
    @InjectRepository(WorkspaceMember)
    private workspaceMememberRepo: Repository<WorkspaceMember>,
    private profileService: ProfileService,
  ) {}

  async create(ownerId: string, name: string) {
    const workspace = this.repo.create({
      id: `workspace_${nanoid()}`,
      owner: { id: ownerId },
      name,
    });

    return await this.repo.save(workspace);
  }

  async findUserWorkspace(ownerId: string) {
    const workspace = await this.repo.findOne({
      where: { owner: { id: ownerId } },
    });

    return workspace;
  }

  async findOne(id: string) {
    const workspace = await this.repo.findOne({ where: { id } });
    return workspace;
  }

  async addMemberToWorkspace(profileId: string, workspaceId: string) {
    try {
      const [workspace, profile] = await Promise.all([
        await this.repo.findOne({
          where: { id: workspaceId },
          relations: ['owner'],
        }),
        await this.profileService.findOne(profileId),
      ]);

      if (!workspace?.id || !profileId) {
        console.log('one of the requirements wasnt met.');
        return;
      }

      /**
       * A workspace owner cannot invite himself to join same workspace
       */
      if (workspace?.owner?.id === profile?.data.id) {
        return { success: true, message: 'member already exists' };
      }

      const newMember = this.workspaceMememberRepo.create({
        profile: profile?.data,
        workspace: workspace,
      });

      await this.workspaceMememberRepo.save(newMember);

      console.log('member has been saved');

      return { success: true, message: 'member added' };
    } catch (error) {
      console.log('An error occured while adding member to a workspace');
    }
  }

  async listWorkspaceMembers(workspaceId: string) {
    const response = await this.workspaceMememberRepo.find({
      where: { workspace: { id: workspaceId } },
      relations: ['workspace', 'profile'],
    });

    const members = response.map(({ profile }) => ({
      username: profile.username,
      imageUrl: profile.imageUrl,
    }));

    return members;
  }
}
