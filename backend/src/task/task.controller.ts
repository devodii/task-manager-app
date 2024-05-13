import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { TaskService } from './services/task.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getTasks(@Headers('SessionId') userId: string) {
    return await this.taskService.findByUser(userId);
  }

  @Get('workspace')
  async getWorkspaceTasks(@Query('workspaceId') workspaceId: string) {
    return await this.taskService.findByWorkspace(workspaceId);
  }

  @Post()
  async addTask(
    @Headers('SessionId') userId: string,
    @Body() dto: CreateTaskDTO,
  ) {
    if (typeof userId == 'undefined') {
      throw new UnauthorizedException('A task must be created by user');
    }

    const { title, description, workspaceId } = dto;

    const assignee = dto?.assignee;

    return await this.taskService.create({
      userId,
      title,
      description,
      workspaceId,
      assignee: {
        name: assignee?.profileName,
        img: assignee?.profileImg,
      },
    });
  }

  @Patch(':id')
  async updateTask(@Param('id') id: string, @Body() dto: UpdateTaskDTO) {
    return await this.taskService.update(id, dto);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    return await this.taskService.remove(id);
  }
}
