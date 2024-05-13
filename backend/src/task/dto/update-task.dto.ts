import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDTO } from './create-task.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTaskDTO extends PartialType(CreateTaskDTO) {
  @IsString()
  @IsNotEmpty()
  id?: string;
}
