import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { TaskService } from './services/task.service';
import { TaskStatus } from './task.interface';

type UpdateTaskStatusDto = {
  id: string;
  newStatus: TaskStatus;
};

@WebSocketGateway({
  namespace: 'task',
  cors: {
    origin: ['http://localhost:3000', 'https://task-manager-v1.vercel.app/'],
  },
})
export class TaskGateway {
  constructor(private taskService: TaskService) {}

  @SubscribeMessage('update-task-status')
  async updateTaskStatus(@MessageBody() dto: UpdateTaskStatusDto) {
    const task = await this.taskService.update(dto.id, {
      status: dto.newStatus,
    });

    return task;
  }
}
