type Actions =
  | 'user.created'
  | 'profile.created'
  | 'profile.view'
  | 'profile.edited'
  | 'user.loggedIn';

export type ApiResponse<TData = Record<string, any>> = {
  object: Actions;
  status: boolean;
  data?: TData;
};
