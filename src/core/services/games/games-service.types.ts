import { BehaviorSubject, Observable } from 'rxjs';
import { GameRole } from '@core/constants/game-role.constants';
import { GameItem } from '@core/interfaces/game-item.interface';
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

export interface HostInfo {
  name: string;
  host: string;
  license: string;
  packagesPublicBaseUrl: string;
}

export interface IGamesService {
  gamesState$: BehaviorSubject<{
    [id: number]: GameItem;
  }>;
  packagePublicUrl$: BehaviorSubject<string>;
  hostInfo$: BehaviorSubject<HostInfo>;
  getAllGames(): Observable<GameItem[]>;
  onGamesCreated(): Observable<GameItem[]>;
  onGamesChanged(): Observable<GameItem[]>;
  onGamesDeleted(): Observable<string[]>;
  createGameController(): void;
  getCurrentGameController(): IGameController;
  removeGameController(): void;
  getHostInfo(): Observable<HostInfo>;
  joinGame(gameId: number, role: GameRole, password?: string): Observable<JoinGameResponse>;
}
