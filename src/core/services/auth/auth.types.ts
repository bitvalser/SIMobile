import { BehaviorSubject } from 'rxjs';

export interface AuthUser {
  name: string;
  avatar: string;
}

export interface IAuthService {
  users$: BehaviorSubject<AuthUser[]>;
  userName$: BehaviorSubject<string>;
  avatar$: BehaviorSubject<string>;
  addUser(user: AuthUser): void;
  removeUser(name: string): void;
}
