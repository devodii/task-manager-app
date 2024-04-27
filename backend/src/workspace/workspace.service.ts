import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { nanoid } from 'nanoid';
import { Repository } from 'typeorm';
import { Workspace } from './entities/workspace.entity';

@Injectable()
export class WorkspaceService {
  constructor(
    @InjectRepository(Workspace) private repo: Repository<Workspace>,
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
}
