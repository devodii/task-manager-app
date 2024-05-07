import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { nanoid } from 'nanoid';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { TaskAssigneeService } from './task-assignee.service';

interface CreateTaskParameters {
  userId: string;
  title: string;
  description: string;
  workspaceId: string;
  assignee?: {
    name: string;
    img?: string;
  };
}

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private repo: Repository<Task>,
    private assigneeService: TaskAssigneeService,
  ) {}

  /**
   * This creates a task and assigns it to a workspace member
   */
  async create({
    userId,
    title,
    description,
    workspaceId,
    assignee,
  }: CreateTaskParameters) {
    try {
      const task = this.repo.create({
        id: `task_${nanoid()}`,
        title,
        description,
        user: { id: userId },
        workspace: { id: workspaceId },
      });

      const [savedTask, savedAssignee] = await Promise.all([
        this.repo.save(task),
        this.assigneeService.create({
          task,
          profileName: assignee.name,
          profileImg: assignee.img,
        }),
      ]);

      console.log({ savedTask, savedAssignee });

      return savedTask;
    } catch (error) {
      console.log({ error });
    }
  }

  async findOne(id: string) {
    const task = await this.repo.findOne({
      where: { id },
      relations: ['assignee'],
    });

    if (!task?.id) {
      throw new NotFoundException('Task not found!');
    }

    return task;
  }

  async findByUser(userId: string) {
    const tasks = await this.repo.find({
      where: { user: { id: userId } },
      relations: ['assignee'],
    });

    return tasks;
  }

  async update(id: string, attrs: Partial<Task>) {
    try {
      const task = await this.findOne(id);

      const assignee = attrs?.assignee as any;

      console.log({ assignee });

      Object.assign(task, {
        ...attrs,
        assignee: {
          profileImg: assignee?.img ?? '',
          profileName: assignee?.name ?? '',
        },
        status: attrs.status,
      });

      const [updateTask] = await Promise.all([
        this.repo.save(task),
        this.assigneeService.upsert({
          id: assignee?.id,
          task,
          profileImg: assignee?.img,
          profileName: assignee?.name,
        }),
      ]);

      return updateTask;
    } catch (error) {
      console.log('an error occured while updating task', error);
    }
  }

  async findByWorkspace(workspaceId: string) {
    const tasks = await this.repo.find({
      where: { workspace: { id: workspaceId } },
      relations: ['workspace'],
    });

    return tasks;
  }

  async remove(id: string) {
    return await this.repo.delete({ id });
  }
}