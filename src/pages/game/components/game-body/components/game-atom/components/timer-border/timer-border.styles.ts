import { Animated } from 'react-native';
import styled from 'styled-components/native';

export const LeftBorder = styled(Animated.View)`
  position: absolute;
  left: 0;
  width: 10px;
  z-index: 2;
  height: 100%;
  background-color: ${({ theme }) => theme.pallette.primary};
`;

export const RightBorder = styled(Animated.View)`
  position: absolute;
  right: 0;
  width: 10px;
  z-index: 2;
  height: 100%;
  background-color: ${({ theme }) => theme.pallette.primary};
`;

export const TopBorder = styled(Animated.View)`
  position: absolute;
  top: 0;
  height: 10px;
  width: 100%;
  z-index: 2;
  background-color: ${({ theme }) => theme.pallette.primary};
`;

export const BottomBorder = styled(Animated.View)`
  position: absolute;
  bottom: 0;
  height: 10px;
  width: 100%;
  z-index: 2;
  background-color: ${({ theme }) => theme.pallette.primary};
`;
