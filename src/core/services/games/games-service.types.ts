import { BehaviorSubject, Observable } from 'rxjs';
import { GameItem } from '@core/interfaces/game-item.interface';
import { GameRole } from '@core/constants/game-role.constants';
import { IGameController } from '../game-controller/game-controller.types';

export interface DataSlice<T> {
  data: T[];
  isLastSlice: boolean;
}

export interface JoinGameResponse {
  code: number;
  errorMessage: string;
  isHost: boolean;
  gameId: number;
}

export interface IGamesService {
  gamesState$: BehaviorSubject<{
    [id: number]: GameItem;
  }>;
  getAllGames(): Observable<GameItem[]>;
  onGamesCreated(): Observable<GameItem[]>;
  onGamesChanged(): Observable<GameItem[]>;
  onGamesDeleted(): Observable<string[]>;
  createGameController(): void;
  getCurrentGameController(): IGameController;
  removeGameController(): void;
  joinGame(gameId: number, role: GameRole, password?: string): Observable<JoinGameResponse>;
}
