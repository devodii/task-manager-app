import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Profile } from '../entities/profile.entity';

export class CreateProfileDto implements Partial<Profile> {
  @IsString()
  @IsNotEmpty()
  username?: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;
}
