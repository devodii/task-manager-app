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
};

export type Task = {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
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
  members: any; // todo: add correct type.
};
