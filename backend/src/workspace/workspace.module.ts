import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkspaceMember } from './entities/workspace-member.entity';
import { Workspace } from './entities/workspace.entity';
import { WorkspaceController } from './workspace.controller';
import { WorkspaceService } from './workspace.service';

@Module({
  imports: [TypeOrmModule.forFeature([Workspace, WorkspaceMember])],
  controllers: [WorkspaceController],
  providers: [WorkspaceService],
})
export class WorkspaceModule {}
