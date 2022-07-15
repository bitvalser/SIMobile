import { i18n } from 'i18next';
import { inject, injectable } from 'inversify';
import base64 from 'react-native-base64';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { TYPES } from '../types';
import { ISiApiClient, SiServer } from './si-api-client.types';

const SUPPORTED_PROTOCOL_VERSION = 1;

@injectable()
export class SiApiClient implements ISiApiClient {
  public static type = TYPES.SiApiClient;
  @inject(TYPES.SiApiUrl)
  private apiUrl: string;
  @inject(TYPES.Translation)
  private translation: i18n;
  public serverUri$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public authToken$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public userName$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  public constructor() {
    this.getSupportedServers = this.getSupportedServers.bind(this);
    this.login = this.login.bind(this);
    this.uploadAvatar = this.uploadAvatar.bind(this);
  }

  public getSupportedServers(): Observable<SiServer> {
    return from(fetch(`${this.apiUrl}/servers`).then((res) => res.json()) as Promise<SiServer[]>).pipe(
      map((servers) => {
        const server = servers.find(({ protocolVersion }) => protocolVersion === SUPPORTED_PROTOCOL_VERSION);
        if (!server) {
          throw new Error(this.translation.t('errors.serverNotFound'));
        }
        return server;
      }),
      tap((server) => {
        this.serverUri$.next(server.uri);
      }),
    );
  }

  public login(name: string, password: string = ''): Observable<string> {
    const formData = new FormData();
    formData.append('login', name);
    formData.append('password', password);
    return from(
      fetch(`${this.serverUri$.getValue()}/api/Account/LogOn`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      }).then((res) => res.text()) as Promise<string>,
    ).pipe(
      tap((token) => {
        this.authToken$.next(token);
        this.userName$.next(name);
      }),
    );
  }

  public uploadAvatar(uri: string): Observable<string> {
    return of(void 0).pipe(
      switchMap(() => fetch(uri).then((res) => res.blob())),
      switchMap((blob) => {
        const formData = new FormData();
        formData.append('file', {
          uri,
          name: uri.split('/').reverse()[0],
          type: blob.type,
        } as any);
        return fetch(`${this.serverUri$.getValue()}/api/upload/image`, {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
            'Content-MD5': base64.encode(uri),
          },
          body: formData,
        }).then((res) => res.text()) as Promise<string>;
      }),
    );
  }
}
