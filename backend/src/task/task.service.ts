import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(@InjectRepository(Task) private repo: Repository<Task>) {}

  async create(userId: string, title: string, description: string) {
    const task = this.repo.create({ title, description, user: { id: userId } });

    return await this.repo.save(task);
  }

  async findOne(id: number) {
    const task = await this.repo.findOne({ where: { id } });

    if (!task?.id) {
      throw new NotFoundException('Task not found!');
    }

    return task;
  }

  async findByUser(userId: string) {
    const tasks = await this.repo.find({ where: { user: { id: userId } } });

    return tasks;
  }

  async update(id: number, attrs: Partial<Task>) {
    const task = await this.findOne(id);

    Object.assign(task, attrs);

    return await this.repo.save(task);
  }

  async remove(id: number) {
    return await this.repo.delete({ id });
  }
}
