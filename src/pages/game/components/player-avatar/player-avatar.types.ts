export interface PlayerAvatarProps {
  avatar?: string;
  name: string;
  size: number;
  avatarState?: AvatarState;
}

export enum AvatarState {
  Wrong = 'wrong',
  Selected = 'selected',
  Quail = 'quail',
  Default = 'default',
  Final = 'final',
  Success = 'success',
  Try = 'try',
  WrongTry = 'wrong-try',
  Selectable = 'selectable',
}
