import {
  Body,
  Controller,
  Headers,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateProfileDto } from './dtos/create-profile.dto';
import { ProfileService } from './profile.service';

@UsePipes(new ValidationPipe({ whitelist: true }))
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  async create(
    @Headers('SessionId') userId: string,
    @Body() dto: CreateProfileDto,
  ) {
    return await this.profileService.create(dto, userId);
  }
}
