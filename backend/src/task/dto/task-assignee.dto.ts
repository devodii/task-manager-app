import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class TaskAssigneeDTO {
  @IsString()
  @IsNotEmpty()
  profileName: string;

  @IsString()
  @IsOptional()
  profileImg: string;
}
