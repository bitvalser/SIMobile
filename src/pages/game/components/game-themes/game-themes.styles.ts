import { Animated } from 'react-native';
import styled from 'styled-components/native';
import { AppText } from '@core/components/text';

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  overflow: hidden;
  position: relative;
  flex: 1;
`;

export const ThemesContainer = styled(Animated.View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: absolute;
  top: 0px;
`;

export const ThemeText = styled(AppText)`
  font-size: 36px;
  text-align: center;
  margin-bottom: 4px;
  color: ${({ theme }) => theme.pallette.primary};
`;
