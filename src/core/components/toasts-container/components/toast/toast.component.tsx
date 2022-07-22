import React, { useEffect, useRef, FC } from 'react';
import { Animated } from 'react-native';
import { useTheme } from 'styled-components/native';
import { AppTheme } from '@theme/index';
import * as Styled from './toast.styles';
import { ToastProps } from './toast.types';

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

const Toast: FC<ToastProps> = React.memo(({ id, text, content = null, delay, type, position, onHide }) => {
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const appearAnim = useRef(new Animated.Value(position === 'bottom' ? 20 : -20)).current;
  const theme = useTheme();

  useEffect(() => {
    Animated.spring(appearAnim, {
      useNativeDriver: true,
      toValue: 0,
    }).start();
  }, [appearAnim]);

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
            translateY: appearAnim,
          },
        ],
      }}>
      <Styled.Content>
        {text ? (
          <Styled.ToastText typeColor={getColor(type, theme)}>{text?.toString() || ''}</Styled.ToastText>
        ) : (
          <>{content}</>
        )}
      </Styled.Content>
    </Styled.AnimatedContainer>
  );
});

export default Toast;
