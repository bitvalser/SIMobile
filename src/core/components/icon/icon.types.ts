import { AppTheme } from '../../../theme';
import { APP_ICONS } from './icon.data';

export interface AppIconProps {
  name: keyof typeof APP_ICONS;
  color?: keyof AppTheme['pallette'];
  size?: number;
}
