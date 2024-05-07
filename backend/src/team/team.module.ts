import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { WorkspaceMember } from 'src/workspace/entities/workspace-member.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([WorkspaceMember])],
  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamModule {}
