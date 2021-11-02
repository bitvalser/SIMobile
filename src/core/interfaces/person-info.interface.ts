import { GameRole } from '@core/constants/game-role.constants';

export interface PersonInfo {
  isOnline: boolean;
  name: string;
  role: GameRole;
}
