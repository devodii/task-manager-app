import { Task } from './entities/task.entity';

export type TaskStatus = 'todo' | 'in_progress' | 'done';

export type CreateTaskParameters = {
  title: string;
  description: string;
  workspaceId: string;
  assignee?: {
    name: string;
    img?: string;
  };
};

export type CreateAssigneeParameters = {
  task: Task;
  profileName: string;
  profileImg?: string;
};

export type UpdateAssigneeParameters = {
  id: string;
} & CreateAssigneeParameters;
