import { BehaviorSubject, Observable } from 'rxjs';
import { GameItem } from '@core/interfaces/game-item.interface';

export interface DataSlice<T> {
  data: T[];
  isLastSlice: boolean;
}

export interface IGamesService {
  gamesState$: BehaviorSubject<{
    [id: number]: GameItem;
  }>;
  getAllGames(): Observable<GameItem[]>;
}
