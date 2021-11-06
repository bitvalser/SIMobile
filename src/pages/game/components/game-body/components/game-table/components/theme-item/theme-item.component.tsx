import React, { FC, memo, useRef, useEffect } from 'react';
import { Animated, Dimensions } from 'react-native';
import { PriceItem } from './components/price-item';
import * as Styled from './theme-item.styles';
import { ThemeItemProps } from './theme-item.types';

const WINDOW_WIDTH = Dimensions.get('window').width;

const ThemeItem: FC<ThemeItemProps> = memo(({ prices, theme, themeIndex }) => {
  const appearAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(appearAnim, {
      useNativeDriver: true,
      toValue: 1,
    }).start();
  }, [appearAnim]);

  return (
    <Styled.Container
      style={{
        transform: [
          {
            translateX: appearAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [(themeIndex % 2 === 1 ? 1 : -1) * WINDOW_WIDTH, 0],
            }),
          },
        ],
      }}>
      <Styled.ThemeName>{theme}</Styled.ThemeName>
      <Styled.QuestionsWrapper>
        {prices.map((price, i) => (
          <Styled.QuestionCeil key={i} ceils={prices.length}>
            {price > 0 && (
              <Styled.PriceButton>
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
