type Actions = 'user.created';

export type ApiResponse<TData = Record<string, any>> = {
  object: Actions;
  status: boolean;
  data?: TData;
};
