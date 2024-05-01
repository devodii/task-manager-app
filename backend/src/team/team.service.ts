import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkspaceMember } from 'src/workspace/entities/workspace-member.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(WorkspaceMember)
    private workspaceMememberRepo: Repository<WorkspaceMember>,
  ) {}

  async getTeams(profileId: string) {
    const workspaces = await this.workspaceMememberRepo.find({
      where: { profile: { id: profileId } },
      relations: ['workspace'],
    });

    return workspaces;
  }
}
