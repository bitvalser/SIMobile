import { AvatarState } from '../player-avatar/player-avatar.types';

export interface UserItemProps {
  name?: string;
  avatar?: string;
  showAvatar?: boolean;
  showSum?: boolean;
  isConnected: boolean;
  sum?: number;
  hide?: boolean;
  avatarState?: AvatarState;
}
