import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import { AppText } from '@core/components/text';

export const BUTTON_HEIGHT = 50;

export const TryButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.pallette.danger};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  border: 1px solid ${({ theme }) => theme.pallette.primary};
  height: ${BUTTON_HEIGHT}px;
  width: 100%;
  elevation: 7;
`;

export const Container = styled.View`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

export const ReadyContainer = styled(LinearGradient).attrs({
  colors: ['#3b3b3b', '#222223', '#222223'],
  angle: 180,
})`
  height: ${BUTTON_HEIGHT}px;
  width: 100%;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
`;

export const ReadyText = styled(AppText)`
  font-size: 22px;
  color: ${({ theme }) => theme.pallette.primary};
`;

export const CloseText = styled(AppText)`
  font-size: 26px;
  color: ${({ theme }) => theme.pallette.primary};
`;

export const CloseWrapper = styled.TouchableOpacity`
  height: ${BUTTON_HEIGHT}px;
  width: ${BUTTON_HEIGHT}px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0px;
  top: 0px;
  z-index: 4;
`;
