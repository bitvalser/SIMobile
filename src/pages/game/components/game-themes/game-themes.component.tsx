import React, { FC, useRef, useState, useEffect } from 'react';
import { Animated, Easing, LayoutChangeEvent } from 'react-native';
import { AppSound } from '@core/constants/sound.constants';
import { useGameController } from '@core/hooks/use-game-controller.hook';
import { useService } from '@core/hooks/use-service.hook';
import useSubscription from '@core/hooks/use-subscription.hook';
import { SoundsService } from '@core/services/sounds/sounds.service';
import * as Styled from './game-themes.styles';

const GameThemes: FC = () => {
  const [{ gameThemes$ }] = useGameController();
  const { getSound } = useService(SoundsService);
  const themes = useSubscription(gameThemes$, []);
  const [elementOpacity, setElementOpacity] = useState(0);
  const scrollAnim = useRef(new Animated.Value(0)).current;
  const containerHeightRef = useRef<{ [key in 'parent' | 'child']: number }>({
    child: null,
    parent: null,
  });

  useEffect(() => {
    const sound = getSound(AppSound.RoundBegin).play();
    return () => {
      sound.stop();
    };
  }, [getSound]);

  const handleLayout = (container: 'parent' | 'child') => ({ nativeEvent }: LayoutChangeEvent) => {
    const height = nativeEvent.layout.height;
    if (containerHeightRef.current[container] === null) {
      containerHeightRef.current[container] = height;
      if (containerHeightRef.current.child > 0 && containerHeightRef.current.parent > 0) {
        scrollAnim.setValue(containerHeightRef.current.parent);
        setElementOpacity(1);
        Animated.timing(scrollAnim, {
          toValue: -containerHeightRef.current.child,
          duration: ((Math.max(3, themes.length) * 15) / 18) * 1000,
          useNativeDriver: true,
          easing: Easing.linear,
        }).start();
      }
    }
  };

  return (
    themes.length > 0 && (
      <Styled.Container onLayout={handleLayout('parent')}>
        <Styled.ThemesContainer
          style={{
            opacity: elementOpacity,
            transform: [{ translateY: scrollAnim }],
          }}
          onLayout={handleLayout('child')}>
          {themes.map((item, i) => (
            <Styled.ThemeText key={i}>{item}</Styled.ThemeText>
          ))}
        </Styled.ThemesContainer>
      </Styled.Container>
    )
  );
};

export default GameThemes;
