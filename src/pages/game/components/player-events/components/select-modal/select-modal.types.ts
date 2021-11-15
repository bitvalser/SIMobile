import { ModalOptions } from '@core/services/modals/modals.types';

export interface SelectModalProps extends ModalOptions {
  selectable: boolean[];
}
