import { ModalOptions } from '@core/services/modals/modals.types';

export interface InfoModalProps extends ModalOptions {
  title: string;
  text: string;
  onConfirm?: () => void;
}
