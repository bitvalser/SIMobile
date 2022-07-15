import { AuthUser } from '@core/services/auth/auth.types';
import { ModalOptions } from '@core/services/modals/modals.types';

export interface NewUserModalProps extends ModalOptions {
  onAdd: (user: AuthUser) => void;
}
