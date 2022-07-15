import { BehaviorSubject, Observable } from 'rxjs';

export interface SiServer {
  uri: string;
  protocolVersion: number;
}

export interface ISiApiClient {
  serverUri$: BehaviorSubject<string>;
  authToken$: BehaviorSubject<string>;
  userName$: BehaviorSubject<string>;
  getSupportedServers(): Observable<SiServer>;
  login(name: string, password?: string): Observable<string>;
  uploadAvatar(uri: string): Observable<string>;
}
