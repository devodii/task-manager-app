import { Injectable, NotFoundException } from '@nestjs/common';
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
    try {
      const workspace = this.repo.create({
        id: `workspace_${nanoid()}`,
        owner: { id: ownerId },
        name,
      });

      const save = await this.repo.save(workspace);

      await this.addMemberToWorkspace(ownerId, save?.id);

      return save;
    } catch (error) {
      console.log('an error occured while creating workspace');
    }
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

      const existingMember = await this.workspaceMememberRepo.findOne({
        where: {
          workspace: { id: workspace?.id },
          profile: { id: profile?.data?.id },
        },
        relations: ['profile', 'workspace'],
      });

      if (!workspace?.id || !profileId) {
        console.log('one of the requirements wasnt met.');
        return;
      }

      // returns true if that member already exists.
      if (existingMember?.profile?.id) {
        return { success: true };
      }

      const newMember = this.workspaceMememberRepo.create({
        profile: profile?.data,
        workspace: workspace,
      });

      await this.workspaceMememberRepo.save(newMember);

      console.log('member has been saved');

      return { success: true, message: 'member added' };
    } catch (error) {
      console.log('An error occured while adding member to a workspace', {
        error,
      });
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

  async update(id: string, name: string) {
    try {
      const workspace = await this.repo.findOne({ where: { id } });

      console.log({ workspace });

      if (!workspace?.id) throw new NotFoundException('WORKSPACE NOT FOUND');

      Object.assign(workspace, { name });

      return await this.repo.save(workspace);
    } catch (error) {
      console.log('an error occured while updating workspace', { error });
    }
  }
}
