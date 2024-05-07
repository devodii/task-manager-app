import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskAssignee } from './entities/task-assignee.entity';
import { Task } from './entities/task.entity';
import { TaskController } from './task.controller';
import { TaskGateway } from './task.gateway';
import { TaskService } from './services/task.service';
import { TaskAssigneeService } from './services/task-assignee.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task, TaskAssignee])],
  controllers: [TaskController],
  providers: [TaskService, TaskGateway, TaskAssigneeService],
})
export class TaskModule {}
