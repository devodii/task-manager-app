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
  UseGuards,
} from '@nestjs/common';
import { CurrentUserId } from 'src/decorators/current-user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { TaskService } from './services/task.service';

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

  @UseGuards(AuthGuard)
  @Post()
  async addTask(@CurrentUserId() userId: string, @Body() dto: CreateTaskDTO) {
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

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateTask(@Param('id') id: string, @Body() dto: UpdateTaskDTO) {
    return await this.taskService.update(id, dto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    return await this.taskService.remove(id);
  }
}
