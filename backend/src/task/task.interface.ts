import { WorkspaceTag } from 'src/workspace/workspace.interface';
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
  tag: {
    name: string;
    color?: string;
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

export type TaskMetadata = {
  tags: WorkspaceTag[];
};
