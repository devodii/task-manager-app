type Actions = 'user.created' | 'user.loggedIn';

export type ApiResponse<TData = Record<string, any>> = {
  object: Actions;
  status: boolean;
  data?: TData;
};
