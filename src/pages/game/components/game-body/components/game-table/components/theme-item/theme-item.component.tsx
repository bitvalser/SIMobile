import React, { FC, memo, useRef, useEffect } from 'react';
import { Animated, Dimensions, Easing } from 'react-native';
import { useGameController } from '@core/hooks/use-game-controller.hook';
import useSubscription from '@core/hooks/use-subscription.hook';
import { PriceItem } from './components/price-item';
import * as Styled from './theme-item.styles';
import { ThemeItemProps } from './theme-item.types';

const WINDOW_WIDTH = Dimensions.get('window').width;

const ThemeItem: FC<ThemeItemProps> = memo(({ prices, theme, themeIndex, index }) => {
  const appearAnim = useRef(new Animated.Value(0)).current;
  const [{ choiceQuestion, yourQuestionChoice$ }] = useGameController();
  const pricesEnabled = useSubscription(yourQuestionChoice$, false);

  useEffect(() => {
    Animated.timing(appearAnim, {
      useNativeDriver: true,
      duration: 500,
      easing: Easing.out(Easing.ease),
      toValue: 1,
    }).start();
  }, [appearAnim]);

  const handleSelectQuestion = (questionIndex: number) => () => {
    choiceQuestion(themeIndex, questionIndex);
  };

  return (
    <Styled.Container
      style={{
        transform: [
          {
            translateX: appearAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [(index % 2 === 1 ? 1 : -1) * WINDOW_WIDTH, 0],
            }),
          },
        ],
      }}>
      <Styled.ThemeName>{theme}</Styled.ThemeName>
      <Styled.QuestionsWrapper>
        {prices.map((price, i) => (
          <Styled.QuestionCeil key={i} ceils={prices.length}>
            {price > 0 && (
              <Styled.PriceButton disabled={!pricesEnabled} onPress={handleSelectQuestion(i)}>
                <PriceItem themeIndex={themeIndex} questionIndex={i} price={price} />
              </Styled.PriceButton>
            )}
          </Styled.QuestionCeil>
        ))}
      </Styled.QuestionsWrapper>
    </Styled.Container>
  );
});

export default ThemeItem;
