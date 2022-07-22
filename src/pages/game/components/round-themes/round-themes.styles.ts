import { Animated } from 'react-native';
import styled from 'styled-components/native';
import { AppText } from '@core/components/text';

export const Container = styled(Animated.View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  overflow: hidden;
  position: relative;
  flex: 1;
`;

export const ThemeText = styled(AppText)`
  font-size: 36px;
  text-align: center;
  color: ${({ theme }) => theme.pallette.primary};
`;
