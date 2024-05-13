import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { TaskAssigneeDTO } from './task-assignee.dto';

export class CreateTaskDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsNotEmpty()
  workspaceId: string;

  @ValidateNested()
  assignee: TaskAssigneeDTO;

  @IsString()
  @IsOptional()
  status: string;
}
