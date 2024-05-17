import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { nanoid } from 'nanoid';
import { ProfileService } from 'src/profile/profile.service';
import { UserService } from 'src/user/user.service';
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
    private usersService: UserService,
  ) {}

  async create(ownerId: string, name: string) {
    const owner = await this.usersService.findOne(ownerId);

    try {
      const workspace = this.repo.create({
        id: `workspace_${nanoid()}`,
        owner,
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

    if (!workspace?.id) throw new NotFoundException('WORKSPACE NOT FOUND');

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

      if (!workspace?.id || !profileId)
        throw new BadRequestException(
          'ONE OF THE REQUIREMENT TO JOIN A WORKSPACE WASNT MET',
        );

      // returns true if that member already exists.
      if (existingMember?.profile?.id) {
        return { success: true };
      }

      const newMember = this.workspaceMememberRepo.create({
        profile: profile?.data,
        workspace: workspace,
      });

      await this.workspaceMememberRepo.save(newMember);

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

      if (!workspace?.id) throw new NotFoundException('WORKSPACE NOT FOUND');

      Object.assign(workspace, { name });

      return await this.repo.save(workspace);
    } catch (error) {
      console.log('an error occured while updating workspace', { error });
    }
  }
}
