export type ActionType<T = string, P = any> = { type: T; payload?: P };

export type ApiResponse<TData = Record<string, any>> = {
  object: string;
  status: boolean;
  data?: TData;
};

export type User = {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  isFake: boolean;
};

export type TaskStatus = "todo" | "in_progress" | "done";

export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;

  assignee?: {
    id: string;
    profileName: string;
    profileImg: string;
  };
};

export type Feedback = {
  id: number;
  message: string;
  user: User;
};

export type Profile = {
  id: string;
  username: string;
  imageUrl?: string;
  createdAt: string;
};

export type Workspace = {
  id: string;
  name: string;
  createdAt: string;
  tasks: Task[];
  owner: User;
  members: WorkspaceMember;
};

export type WorkspaceMember = {
  username: string;
  imageUrl: string;
};

export type Team = {
  id: string;
  workspace: Workspace;
};
