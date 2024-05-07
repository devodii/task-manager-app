import { Controller, Get } from '@nestjs/common';
import { TeamService } from './team.service';
import { CurrentUserId } from 'src/decorators/current-user.decorator';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  async getTeams(@CurrentUserId() profileId: string) {
    const workspaces = await this.teamService.getTeams(profileId);

    return workspaces;
  }
}
