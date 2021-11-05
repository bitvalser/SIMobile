import React, { useEffect, useRef, FC } from 'react';
import { Animated } from 'react-native';
import { DimensionsStyle } from '@core/helpers/dimensions-style.helper';
import { useTheme } from 'styled-components/native';
import { AppTheme } from '@theme/index';
import { ToastProps } from './toast.types';
import * as Styled from './toast.styles';

const TOAST_HEIGHT = 40;

const getColor = (type: ToastProps['type'], theme: AppTheme) => {
  switch (type) {
    case 'danger':
      return theme.pallette.danger;
    case 'info':
      return theme.pallette.black;
    default:
      return theme.pallette.black;
  }
};

const Toast: FC<ToastProps> = React.memo(({ id, text, content, delay, index, type, onHide }) => {
  const toggleAnim = useRef(new Animated.Value(TOAST_HEIGHT)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const theme = useTheme();

  useEffect(() => {
    Animated.spring(toggleAnim, {
      useNativeDriver: true,
      toValue: -(index * (TOAST_HEIGHT + 8) + DimensionsStyle.safeAreaBottomHeight + 20),
    }).start();
  }, [index, toggleAnim]);

  useEffect(() => {
    Animated.timing(opacityAnim, {
      useNativeDriver: true,
      delay,
      toValue: 0,
      duration: 400,
    }).start(() => onHide(id));
  }, [opacityAnim, delay, onHide, id]);

  return (
    <Styled.AnimatedContainer
      style={{
        opacity: opacityAnim,
        transform: [
          {
            translateY: toggleAnim,
          },
        ],
      }}>
      <Styled.Content>
        {text ? <Styled.ToastText typeColor={getColor(type, theme)}>{text}</Styled.ToastText> : <>{content}</>}
      </Styled.Content>
    </Styled.AnimatedContainer>
  );
});

export default Toast;
