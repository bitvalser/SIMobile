import { BehaviorSubject } from 'rxjs';
import { ReactNode } from 'react';

export interface ToastInstance {
  id: string;
  type?: 'danger' | 'info';
  text?: string;
  delay?: number;
  content?: ReactNode;
  container?: string;
}

export interface IToastsService {
  toastsState$: BehaviorSubject<ToastInstance[]>;
  showToast(options: Omit<ToastInstance, 'id'>): string;
  removeToast(id: string): void;
}
