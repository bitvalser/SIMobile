import { GameUser } from './game-user.interface';

export interface GamePlayer extends GameUser {
  sum?: number;
  inFinal?: boolean;
}
