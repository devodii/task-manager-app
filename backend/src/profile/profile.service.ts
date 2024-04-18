import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dtos/create-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(@InjectRepository(Profile) private repo: Repository<Profile>) {}
  async create(dto: CreateProfileDto, ownerId: string) {
    console.log({ dto, ownerId });

    const profile = this.repo.create({ ...dto, user: { id: ownerId } });
    return await this.repo.save(profile);
  }
}
