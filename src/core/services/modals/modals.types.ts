import { FC } from 'react';
import { ModalProps } from 'react-native';
import { BehaviorSubject } from 'rxjs';

export interface ModalInstance {
  id: string;
  component: FC;
  options: Omit<ModalProps, 'visible'>;
}

export interface IModalsService {
  modalsState$: BehaviorSubject<ModalInstance[]>;
  addModal(component: FC, options?: ModalInstance['options']): string;
  removeModal(id: string): void;
}

export interface ModalOptions {
  close: () => void;
}
