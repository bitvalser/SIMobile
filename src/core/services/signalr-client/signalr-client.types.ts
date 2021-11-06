import { Observable } from 'rxjs';
import { SignalEvent } from '@core/constants/signal-event.constants';
import { SignalRequest } from '@core/constants/signal-request.constants';

export interface ISignalRClient {
  connect(): Observable<void>;
  invoke<T = any>(request: SignalRequest, ...data: any[]): Observable<T>;
  on<T = any>(event: SignalEvent): Observable<T>;
}
