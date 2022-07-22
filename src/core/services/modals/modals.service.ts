import { injectable } from 'inversify';
import { FC } from 'react';
import 'react-native-get-random-values';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { TYPES } from '../types';
import { IModalsService, ModalInstance } from './modals.types';

@injectable()
export class ModalsService implements IModalsService {
  public static type = TYPES.ModalsService;
  public modalsState$: BehaviorSubject<ModalInstance[]> = new BehaviorSubject<ModalInstance[]>([]);

  public constructor() {
    this.addModal = this.addModal.bind(this);
    this.removeModal = this.removeModal.bind(this);
  }

  public addModal(component: FC<any>, options: ModalInstance['options'] = {}): string {
    const id = uuidv4();
    this.modalsState$.next([
      ...this.modalsState$.getValue(),
      {
        id,
        component,
        options: {
          animationType: 'slide',
          transparent: true,
          ...options,
        },
      },
    ]);
    return id;
  }

  public removeModal(id: string): void {
    this.modalsState$.next(this.modalsState$.getValue().filter(({ id: removeId }) => removeId !== id));
  }
}
