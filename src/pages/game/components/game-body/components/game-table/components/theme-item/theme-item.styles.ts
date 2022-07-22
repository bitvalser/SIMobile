import { Animated, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { AppText } from '@core/components/text';

const WINDOW_WIDTH = Dimensions.get('window').width;

export const Container = styled(Animated.View)`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const QuestionsWrapper = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const PriceButton = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: center;
  width: 100%;
`;

export const QuestionCeil = styled.View<{ ceils: number }>`
  width: ${({ ceils }) => WINDOW_WIDTH / ceils}px;
  height: ${({ ceils }) => WINDOW_WIDTH / ceils}px;
  min-width: 50px;
  min-height: 50px;
  max-width: 100px;
  max-height: 100px;
  border: 1px solid ${({ theme }) => theme.pallette.primary};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ThemeName = styled(AppText)`
  font-size: 18px;
  color: ${({ theme }) => theme.pallette.primary};
`;
