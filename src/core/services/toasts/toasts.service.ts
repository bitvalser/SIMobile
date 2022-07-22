import { injectable } from 'inversify';
import 'react-native-get-random-values';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { TYPES } from '../types';
import { IToastsService, ToastInstance } from './toasts.types';

const DEFAULT_DELAY = 5000;

@injectable()
export class ToastsService implements IToastsService {
  public static type = TYPES.ToastsService;
  public toastsState$: BehaviorSubject<ToastInstance[]> = new BehaviorSubject<ToastInstance[]>([]);

  public constructor() {
    this.showToast = this.showToast.bind(this);
    this.removeToast = this.removeToast.bind(this);
  }

  public showToast(options: Omit<ToastInstance, 'id'>): string {
    const id = uuidv4();
    this.toastsState$.next([
      ...this.toastsState$.getValue(),
      {
        id,
        ...options,
        delay: options.delay || DEFAULT_DELAY,
        container: options.container || 'root',
      },
    ]);
    return id;
  }

  public removeToast(id: string): void {
    this.toastsState$.next(this.toastsState$.getValue().filter(({ id: removeId }) => removeId !== id));
  }
}
