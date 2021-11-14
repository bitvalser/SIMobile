import { ToastInstance } from '@core/services/toasts/toasts.types';
import { ReactNode } from 'react';

export interface ToastProps {
  id: string;
  index: number;
  delay: number;
  content?: ReactNode;
  text?: string;
  type?: ToastInstance['type'];
  onHide: (id: string) => void;
}
