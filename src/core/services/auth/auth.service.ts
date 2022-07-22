import { inject, injectable } from 'inversify';
import MMKVStorage from 'react-native-mmkv-storage';
import { BehaviorSubject } from 'rxjs';
import { StorageKeys } from '@core/constants/storage-keys.constants';
import { TYPES } from '../types';
import { AuthUser, IAuthService } from './auth.types';

@injectable()
export class AuthService implements IAuthService {
  public static type = TYPES.AuthService;

  public users$: BehaviorSubject<AuthUser[]> = new BehaviorSubject<AuthUser[]>([]);
  public userName$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public avatar$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  public constructor(@inject(TYPES.Storage) storage: MMKVStorage.API) {
    this.users$.next(storage.getArray<AuthUser>(StorageKeys.Users) || []);
    this.users$.subscribe((users) => {
      storage.setArray(StorageKeys.Users, users);
    });

    this.addUser = this.addUser.bind(this);
    this.removeUser = this.removeUser.bind(this);
  }

  public addUser(user: AuthUser): void {
    this.users$.next([...this.users$.getValue(), user]);
  }

  public removeUser(name: string): void {
    this.users$.next(this.users$.getValue().filter((user) => user.name !== name));
  }
}
