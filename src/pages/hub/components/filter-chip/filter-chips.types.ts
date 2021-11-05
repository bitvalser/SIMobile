import { StyleProp, ViewStyle } from 'react-native';

export interface FilterChipProps {
  selected?: boolean;
  text: string;
  onClick?: () => void;
  style?: StyleProp<ViewStyle>;
}
