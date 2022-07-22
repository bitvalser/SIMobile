import { Animated } from 'react-native';
import styled from 'styled-components/native';
import { AppText } from '@core/components/text';

export const Container = styled(Animated.View)`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const PriceText = styled(AppText)`
  font-size: 20px;
  color: ${({ theme }) => theme.pallette.primary};
`;
