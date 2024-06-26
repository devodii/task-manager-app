import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { nanoid } from 'nanoid';
import { Repository } from 'typeorm';
import { UpdateTaskDTO } from '../dto/update-task.dto';
import { Task } from '../entities/task.entity';
import { CreateTaskParameters } from '../task.interface';
import { TaskAssigneeService } from './task-assignee.service';

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
    title,
    description,
    workspaceId,
    assignee,
    tag,
  }: CreateTaskParameters) {
    try {
      const task = this.repo.create({
        id: `task_${nanoid()}`,
        title,
        description,
        workspace: { id: workspaceId },
        metadata: {
          tags: [tag],
        },
      });

      const [savedTask] = await Promise.all([
        this.repo.save(task),
        this.assigneeService.create({
          task,
          profileName: assignee.name,
          profileImg: assignee.img,
        }),
      ]);

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

  async update(id: string, attrs: UpdateTaskDTO) {
    try {
      const task = await this.findOne(id);

      const assignee = attrs?.assignee as any;
      const tag = attrs?.tag;

      Object.assign(task, {
        ...attrs,
        assignee: {
          profileImg: assignee?.profileImg ?? '',
          profileName: assignee?.profileName ?? '',
        },
        status: attrs.status,
        metadata: {
          ...task.metadata,
          tags: [{ name: tag.name, color: tag.color }],
        },
      });

      const [updateTask] = await Promise.all([
        this.repo.save(task),
        this.assigneeService.upsert({
          id: assignee?.id,
          task,
          profileImg: assignee?.profileImg,
          profileName: assignee?.profileName,
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
      relations: ['workspace', 'assignee'],
    });

    return tasks;
  }

  // todo: add only owner guard.
  async remove(id: string) {
    return await this.repo.delete({ id });
  }
}
