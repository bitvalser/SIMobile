import { GamePlayer } from './game-player.interface';

export interface UserAction {
  user: GamePlayer;
  timer: number;
}
