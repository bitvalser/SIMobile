import { ModalOptions } from '@core/services/modals/modals.types';

export interface AppealModalProps extends ModalOptions {
  answer: string;
  name: string;
  rightAnswers: string[];
  onSelect: (right: boolean) => void;
}
