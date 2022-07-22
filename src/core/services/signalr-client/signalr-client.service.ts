import { inject, injectable } from 'inversify';
import { from, Observable } from 'rxjs';
import { SignalEvent } from '@core/constants/signal-event.constants';
import { SignalRequest } from '@core/constants/signal-request.constants';
import * as signalR from '@microsoft/signalr';
import { TYPES } from '../types';
import { ISignalRClient } from './signalr-client.types';

@injectable()
export class SignalRClient implements ISignalRClient {
  public static type = TYPES.SignalRClient;
  @inject(TYPES.ServerUri)
  private serverUriFactory: () => string;
  @inject(TYPES.AuthToken)
  private authTokenFactory: () => string;
  private connection: signalR.HubConnection;

  public constructor() {
    this.connect = this.connect.bind(this);
    this.invoke = this.invoke.bind(this);
    this.on = this.on.bind(this);
  }

  public connect(): Observable<void> {
    return new Observable((observer) => {
      this.connection = new signalR.HubConnectionBuilder()
        .withUrl(`${this.serverUriFactory()}/sionline?token=${encodeURIComponent(this.authTokenFactory())}`)
        .build();

      this.connection.start().then(() => {
        observer.next();
        observer.complete();
      });
    });
  }

  public invoke<T = any>(request: SignalRequest, ...data: any[]): Observable<T> {
    return from(this.connection.invoke<T>(request, ...data));
  }

  public on<T = any>(event: SignalEvent): Observable<T> {
    return new Observable((observer) => {
      this.connection.on(event, (...data) => {
        observer.next((data as unknown) as T);
      });
    });
  }
}
