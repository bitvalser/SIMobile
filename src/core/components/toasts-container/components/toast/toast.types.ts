import { ToastInstance } from '@core/services/toasts/toasts.types';
import { ReactNode } from 'react';

export interface ToastProps {
  id: string;
  delay: number;
  content?: ReactNode;
  position: 'top' | 'bottom';
  text?: string;
  type?: ToastInstance['type'];
  onHide: (id: string) => void;
}
