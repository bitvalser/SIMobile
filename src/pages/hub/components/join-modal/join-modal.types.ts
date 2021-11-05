import { ModalOptions } from '@core/services/modals/modals.types';

export interface JoinModalProps extends ModalOptions {
  gameId: number;
  name: string;
  withPassword: boolean;
  withMaster: boolean;
  canJoinPlayer: boolean;
  onJoin: () => void;
}
