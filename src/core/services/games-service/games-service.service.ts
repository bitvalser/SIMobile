import { SignalEvent } from '@core/constants/signal-event.constants';
import { SignalRequest } from '@core/constants/signal-request.constants';
import { GameItem } from '@core/interfaces/game-item.interface';
import { inject, injectable } from 'inversify';
import { BehaviorSubject, EMPTY, interval, Observable, of } from 'rxjs';
import {
  expand,
  switchMap,
  map,
  combineAll,
  tap,
  filter,
  buffer,
} from 'rxjs/operators';
import { SignalRClient } from '../signalr-client/signalr-client.service';
import { TYPES } from '../types';
import { DataSlice, IGamesService } from './games-service.types';

const UPDATE_DELAY = 2000;

@injectable()
export class GamesService implements IGamesService {
  public static type = TYPES.GamesService;
  @inject(TYPES.SignalRClient)
  private signalR: SignalRClient;
  public gamesState$: BehaviorSubject<{
    [id: number]: GameItem;
  }> = new BehaviorSubject({});

  public constructor() {
    this.getAllGames = this.getAllGames.bind(this);
    this.onGamesChanged = this.onGamesChanged.bind(this);
    this.onGamesDeleted = this.onGamesDeleted.bind(this);
    this.onGamesCreated = this.onGamesCreated.bind(this);
  }

  private getGameSlice(fromId: number = 0): Observable<DataSlice<GameItem>> {
    return this.signalR.invoke<DataSlice<GameItem>>(
      SignalRequest.GetGamesSlice,
      fromId,
    );
  }

  public getAllGames(): Observable<GameItem[]> {
    return this.getGameSlice().pipe(
      switchMap((slice) =>
        !slice.isLastSlice && slice.data.length > 0
          ? of(slice).pipe(
              expand(({ data, isLastSlice }) => {
                if (isLastSlice || data.length === 0) {
                  return EMPTY;
                }
                return this.getGameSlice(data[data.length - 1].gameID + 1);
              }),
              map(({ data }) => of(data)),
              combineAll(),
              map((data) => data.flat()),
            )
          : of(slice.data),
      ),
      tap((data) => {
        this.gamesState$.next(
          data.reduce((acc, val) => ({ ...acc, [val.gameID]: val }), {}),
        );
      }),
    );
  }

  public onGamesChanged(): Observable<GameItem[]> {
    return this.signalR.on<[GameItem?]>(SignalEvent.GameChanged).pipe(
      filter((data) => data?.length > 0),
      map((data) => data[0]),
      buffer(interval(UPDATE_DELAY)),
      filter((data) => data?.length > 0),
      tap((data) => {
        this.gamesState$.next({
          ...this.gamesState$.getValue(),
          ...data.reduce((acc, val) => ({ ...acc, [val.gameID]: val }), {}),
        });
      }),
    );
  }

  public onGamesCreated(): Observable<GameItem[]> {
    return this.signalR.on<[GameItem?]>(SignalEvent.GameCreated).pipe(
      filter((data) => data?.length > 0),
      map((data) => data[0]),
      buffer(interval(UPDATE_DELAY)),
      filter((data) => data?.length > 0),
      tap((data) => {
        this.gamesState$.next({
          ...this.gamesState$.getValue(),
          ...data.reduce((acc, val) => ({ ...acc, [val.gameID]: val }), {}),
        });
      }),
    );
  }

  public onGamesDeleted(): Observable<string[]> {
    return this.signalR.on<[string?]>(SignalEvent.GameDeleted).pipe(
      filter((data) => data?.length > 0),
      map((data) => data[0]),
      buffer(interval(UPDATE_DELAY)),
      filter((data) => data?.length > 0),
      tap((data) => {
        const newState = { ...this.gamesState$.getValue() };
        data.forEach((key) => {
          delete newState[key];
        });
        this.gamesState$.next(newState);
      }),
    );
  }
}
