import React, { FC, memo, useRef, useEffect } from 'react';
import { Animated, Easing } from 'react-native';
import { filter, map } from 'rxjs/operators';
import { GameEventType } from '@core/constants/game-event-type.constants';
import { useGameController } from '@core/hooks/use-game-controller.hook';
import * as Styled from './price-item.styles';
import { PriceItemProps } from './price-item.types';

const PriceItem: FC<PriceItemProps> = memo(({ price, questionIndex, themeIndex }) => {
  const [{ listen }] = useGameController();
  const blinkAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const subscription = listen(GameEventType.QuestionSelected)
      .pipe(
        map((item) => item.data),
        filter(([theme, question]) => themeIndex === theme && question === questionIndex),
      )
      .subscribe(() => {
        const stepTime = 125;
        Animated.loop(
          Animated.sequence([
            Animated.timing(blinkAnim, {
              toValue: 300,
              duration: stepTime,
              easing: Easing.linear,
              useNativeDriver: false,
            }),
            Animated.timing(blinkAnim, {
              toValue: 0,
              duration: 250,
              easing: Easing.linear,
              useNativeDriver: false,
            }),
          ]),
        ).start();
      });
    return () => {
      subscription.unsubscribe();
    };
  }, [blinkAnim, questionIndex, listen, themeIndex]);

  return (
    <Styled.Container
      style={{
        backgroundColor: blinkAnim.interpolate({
          inputRange: [0, 300],
          outputRange: ['rgba(152, 185, 255, 0)', 'rgba(152, 185, 255, 0.7)'],
        }),
      }}>
      <Styled.PriceText>{price}</Styled.PriceText>
    </Styled.Container>
  );
});

export default PriceItem;
