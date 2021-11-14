import { inject, injectable } from 'inversify';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { IGamesService } from '../games/games-service.types';
import { TYPES } from '../types';
import { ILogsService, LogItem } from './logs.types';

const LOGS_SIZE = 100;
const FIREBASE_STORAGE_ULR =
  'https://firestore.googleapis.com/v1/projects/simobile-f4da5/databases/(default)/documents';

@injectable()
export class LogsService implements ILogsService {
  public static type = TYPES.LogsService;
  @inject(TYPES.GamesService)
  private gamesService: IGamesService;
  private lastLogs$: BehaviorSubject<LogItem[]> = new BehaviorSubject([]);

  public log(text: string): void {
    const logs = [...this.lastLogs$.getValue()];
    this.lastLogs$.next([
      ...logs.slice(logs.length - LOGS_SIZE),
      {
        date: new Date().toISOString(),
        text,
      },
    ]);
  }

  public sendError(error: Error, type: 'boundary' | 'custom', additionalInfo: object = {}): Observable<string> {
    return this.lastLogs$.pipe(
      take(1),
      switchMap((lastLogs) =>
        fetch(`${FIREBASE_STORAGE_ULR}/errors`, {
          method: 'POST',
          body: JSON.stringify({
            fields: {
              type: {
                stringValue: type,
              },
              isDev: {
                booleanValue: __DEV__,
              },
              gameState: {
                stringValue: this.gamesService?.getCurrentGameController()?.createStringSnapshot() || '',
              },
              info: {
                stringValue: JSON.stringify({
                  error,
                  lastLogs,
                  ...additionalInfo,
                }),
              },
            },
          }),
        }).then((res) => res.json()),
      ),
      map((data) => (data?.name || '-').split('/').reverse()[0]),
    );
  }
}
