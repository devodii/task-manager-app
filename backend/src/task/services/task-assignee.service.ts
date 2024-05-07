import { InjectRepository } from '@nestjs/typeorm';
import { nanoid } from 'nanoid';
import { Repository } from 'typeorm';
import { TaskAssignee } from '../entities/task-assignee.entity';
import { Task } from '../entities/task.entity';

interface CreateAssigneeParameters {
  task: Task;
  profileName: string;
  profileImg?: string;
}

interface UpdateAssigneeParameters extends CreateAssigneeParameters {
  id: string;
}

export class TaskAssigneeService {
  constructor(
    @InjectRepository(TaskAssignee)
    private repo: Repository<TaskAssignee>,
  ) {}

  async create({ task, profileName, profileImg }: CreateAssigneeParameters) {
    const assignee = this.repo.create({
      id: `ass_${nanoid()}`,
      profileName,
      profileImg,
      task,
    });

    const savedAssignee = await this.repo.save(assignee);

    return savedAssignee;
  }

  async upsert({
    id,
    profileName,
    profileImg,
    task,
  }: UpdateAssigneeParameters) {
    if (id?.length < 3) {
      return await this.create({ task, profileName, profileImg });
    }

    const assignee = await this.repo.findOne({ where: { id } });

    Object.assign(assignee, { profileImg, profileName });

    return await this.repo.save(assignee);
  }
}
