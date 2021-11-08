import { Animated } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 12px;
`;

export const UserWrapper = styled(Animated.View)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 115px;
`;

export const TimerWrapper = styled.View`
  width: 100%;
  position: absolute;
  top: -6px;
  z-index: 5;
`;

export const ReplicContainer = styled(Animated.View)`
  display: flex;
  width: 100%;
  height: 100px;
  position: absolute;
  top: -108px;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.pallette.white};
  justify-content: center;
  z-index: 9;
  left: 12px;
  border-radius: 2px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.8;
  shadow-radius: 2px;
  elevation: 6;
`;

export const ReplicText = styled.Text`
  font-size: 16px;
  text-align: center;
  color: ${({ theme }) => theme.pallette.black};
`;
