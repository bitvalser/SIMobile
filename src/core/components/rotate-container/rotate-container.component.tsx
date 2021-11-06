import React, { FC, useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { RotateContainerProps } from './rotate-container.types';

const RotateContainer: FC<RotateContainerProps> = ({ style, children, duration = 1500, rotate = '90deg' }) => {
  const rotateAnime = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(rotateAnime, {
          toValue: 1,
          duration,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnime, {
          toValue: 0,
          duration,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [duration, rotateAnime]);

  return (
    <Animated.View
      style={[
        style,
        {
          transform: [
            {
              rotateY: rotateAnime.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', rotate],
              }),
            },
          ],
        },
      ]}>
      {children}
    </Animated.View>
  );
};

export default RotateContainer;
