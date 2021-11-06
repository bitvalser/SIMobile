import { Animated } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled(Animated.View)`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const PriceText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.pallette.primary};
`;
