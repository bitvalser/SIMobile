import { Animated } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 8px;
`;

export const MessageContainer = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: flex-end;
`;

export const FloatMessage = styled(Animated.View)`
  padding: 1px 4px;
  position: absolute;
  right: 8px;
  align-items: center;
  max-width: 100%;
  display: flex;
  flex-direction: row;
  border-radius: 4px;
  background: ${({ theme }) => theme.pallette.white};
`;

export const Divider = styled.View`
  width: 8px;
`;
