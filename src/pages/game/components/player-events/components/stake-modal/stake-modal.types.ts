import { ModalOptions } from '@core/services/modals/modals.types';

export interface StakeModalProps extends ModalOptions {
  min: number;
  max: number;
  step?: number;
  stake?: boolean;
  pass?: boolean;
  allIn?: boolean;
  nominal?: boolean;
  onSelect: (sum: number) => void;
  onAllIn?: () => void;
  onNominal?: () => void;
  onPass?: () => void;
}
