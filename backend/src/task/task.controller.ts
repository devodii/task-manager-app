import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getTasks(@Headers('SessionId') userId: string) {
    return await this.taskService.findByUser(userId);
  }

  @Post()
  async addTask(@Headers('SessionId') userId: string, @Body() dto: any) {
    if (typeof userId == 'undefined') {
      throw new UnauthorizedException('A task must be created by user');
    }

    console.log({ dto });
    return await this.taskService.create(userId, dto.title, dto.description);
  }

  @Patch(':id')
  async updateTask(@Param('id') id: number, @Body() dto: any) {
    return await this.taskService.update(id, dto);
  }
}
