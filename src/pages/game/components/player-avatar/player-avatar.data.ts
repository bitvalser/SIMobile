import { AppTheme } from '@theme/index';
import { AvatarState } from './player-avatar.types';

export const getBorderColor = (state: AvatarState, theme: AppTheme): string => {
  switch (state) {
    case AvatarState.Try:
      return theme.pallette.primary;
    case AvatarState.WrongTry:
      return theme.pallette.primary;
    case AvatarState.Success:
      return '#65fe08';
    case AvatarState.Wrong:
      return '#ff160c';
    case AvatarState.Quail:
      return '#808080';
    case AvatarState.Selectable:
      return theme.pallette.secondaryHighlight;
    case AvatarState.Final:
      return '#cb00f5';
    case AvatarState.Appealed:
      return '#cb00f5';
    default:
      return '#000';
  }
};
