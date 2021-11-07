import React, { FC, useRef, useEffect, memo, useState } from 'react';
import { useGameController } from '@core/hooks/use-game-controller.hook';
import * as Styled from './timer-border.styles';
import { filter } from 'rxjs/operators';
import { Animated } from 'react-native';
import { TimerCommand } from '@core/constants/timer-command.constants';

const TimerBorder: FC = memo(() => {
  const [{ timerChannel$, pauseChannel$, timerMaxTime$, canTry$ }] = useGameController();
  const [showBorder, setShowBorder] = useState(false);
  const timerAnim = useRef(new Animated.Value(0)).current;
  const animationRef = useRef<Animated.CompositeAnimation>(
    Animated.timing(timerAnim, {
      toValue: 100,
      useNativeDriver: false,
      duration: timerMaxTime$.getValue() * 100,
    }),
  );

  useEffect(() => {
    const subscriptionPause = pauseChannel$.subscribe((isPaused) => {
      if (isPaused) {
        animationRef.current?.stop();
      } else {
        animationRef.current?.start();
      }
    });
    const subscriptionTry = canTry$.subscribe(() => {
      animationRef.current?.start();
      setShowBorder(true);
    });
    return () => {
      subscriptionPause.unsubscribe();
      subscriptionTry.unsubscribe();
    };
  }, [pauseChannel$, canTry$]);

  useEffect(() => {
    const subscription = timerChannel$.pipe(filter(({ index }) => index === 1)).subscribe(({ command, time }) => {
      switch (command) {
        case TimerCommand.Pause:
        case TimerCommand.UserPause:
          animationRef.current?.stop();
          break;
        case TimerCommand.Resume:
        case TimerCommand.UserResume:
          animationRef.current?.start();
          break;
        case TimerCommand.MaxTime:
          animationRef.current = Animated.timing(timerAnim, {
            toValue: 100,
            useNativeDriver: false,
            duration: time * 100,
          });
          break;
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [timerAnim, timerChannel$]);

  return (
    showBorder && (
      <>
        <Styled.TopBorder
          style={{
            width: timerAnim.interpolate({
              inputRange: [0, 100],
              outputRange: ['100%', '0%'],
            }),
          }}
        />
        <Styled.RightBorder
          style={{
            height: timerAnim.interpolate({
              inputRange: [0, 100],
              outputRange: ['100%', '0%'],
            }),
          }}
        />
        <Styled.BottomBorder
          style={{
            width: timerAnim.interpolate({
              inputRange: [0, 100],
              outputRange: ['100%', '0%'],
            }),
          }}
        />
        <Styled.LeftBorder
          style={{
            height: timerAnim.interpolate({
              inputRange: [0, 100],
              outputRange: ['100%', '0%'],
            }),
          }}
        />
      </>
    )
  );
});

export default TimerBorder;
