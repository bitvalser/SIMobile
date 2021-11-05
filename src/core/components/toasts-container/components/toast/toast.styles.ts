import { Animated } from 'react-native';
import styled from 'styled-components/native';

export const AnimatedContainer = styled(Animated.View)`
  width: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  z-index: 999;
  elevation: 6;
  align-items: center;
  justify-content: center;
  bottom: 0;
`;

export const ToastText = styled.Text<{ typeColor: string }>`
  color: ${({ typeColor }) => typeColor};
  font-size: 14px;
`;

export const Content = styled.View`
  display: flex;
  height: 40px;
  flex-direction: row;
  background: ${({ theme }) => theme.pallette.white};
  padding: 8px 16px;
  border-radius: 4px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.8;
  shadow-radius: 2px;
  elevation: 5;
`;
