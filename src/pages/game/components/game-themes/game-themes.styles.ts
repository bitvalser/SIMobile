import { Animated } from 'react-native';
import styled from 'styled-components/native';

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

export const ThemeText = styled.Text`
  font-size: 36px;
  text-align: center;
  font-weight: bold;
  text-shadow-color: #000;
  text-shadow-offset: 0px 1px;
  text-shadow-radius: 5px;
  margin-bottom: 4px;
  color: ${({ theme }) => theme.pallette.primary};
`;
