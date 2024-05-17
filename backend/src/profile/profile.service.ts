import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiResponse } from 'src/types';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dtos/create-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile) private repo: Repository<Profile>,
    private readonly userService: UserService,
  ) {}

  async create(
    dto: CreateProfileDto,
    ownerId: string,
  ): Promise<ApiResponse<Profile>> {
    const user = await this.userService.findOne(ownerId);

    const profile = this.repo.create({
      ...dto,
      user,
      id: ownerId,
    });
    const save = await this.repo.save(profile);

    return { object: 'profile.created', status: true, data: save };
  }

  async findOne(profileId: string): Promise<ApiResponse<Profile> | undefined> {
    const profile = await this.repo.findOne({ where: { id: profileId } });

    if (!profile?.id) return;

    return { object: 'profile.view', status: true, data: profile };
  }
}
