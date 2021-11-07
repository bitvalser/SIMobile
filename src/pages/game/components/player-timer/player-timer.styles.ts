import { Animated } from 'react-native';
import styled from 'styled-components/native';

const TIMER_COLOR = '#0052ff';

export const Container = styled.View`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.pallette.black};
  background-color: ${({ theme }) => theme.pallette.secondaryBackground};
`;

export const Timer = styled(Animated.View)`
  width: 100%;
  height: 5px;
  border: 1px solid ${({ theme }) => theme.pallette.black};
  background-color: ${TIMER_COLOR};
`;
