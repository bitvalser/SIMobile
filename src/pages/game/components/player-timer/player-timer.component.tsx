import React, { FC, useEffect, useRef, memo, useState } from 'react';
import { useGameController } from '@core/hooks/use-game-controller.hook';
import { Animated } from 'react-native';
import * as Styled from './player-timer.styles';
import { filter } from 'rxjs/operators';
import { TimerCommand } from '@core/constants/timer-command.constants';
import { PlayerTimerProps } from './player-timer.types';

const PlayerTimer: FC<PlayerTimerProps> = memo(({ name, initialTime = 0 }) => {
  const [{ timerChannel$, pauseChannel$ }] = useGameController();
  const [stop, setStop] = useState(initialTime === 0);
  const timerAnim = useRef(new Animated.Value(0)).current;
  const animationRef = useRef<Animated.CompositeAnimation>();

  useEffect(() => {
    if (initialTime > 0) {
      setStop(false);
      timerAnim.setValue(0);
      animationRef.current = Animated.timing(timerAnim, {
        toValue: 100,
        useNativeDriver: false,
        duration: initialTime * 100,
      });
      animationRef.current.start();
    }
  }, [initialTime, timerAnim]);

  useEffect(() => {
    const subscription = pauseChannel$.subscribe((isPaused) => {
      if (isPaused) {
        animationRef.current?.stop();
      } else {
        animationRef.current?.start();
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [pauseChannel$]);

  useEffect(() => {
    const subscription = timerChannel$
      .pipe(
        filter(
          ({ index, playerName, command }) => (index === 2 && playerName === name) || command === TimerCommand.Stop,
        ),
      )
      .subscribe(({ command, time }) => {
        setStop(false);
        switch (command) {
          case TimerCommand.Go:
            timerAnim.setValue(0);
            animationRef.current = Animated.timing(timerAnim, {
              toValue: 100,
              useNativeDriver: false,
              duration: time * 100,
            });
            animationRef.current.start();
            break;
          case TimerCommand.Stop:
            setStop(true);
            break;
          case TimerCommand.Pause:
          case TimerCommand.UserPause:
            animationRef.current?.stop();
            break;
          case TimerCommand.Resume:
          case TimerCommand.UserResume:
            animationRef.current?.start();
            break;
        }
      });
    return () => {
      subscription.unsubscribe();
    };
  }, [name, timerAnim, timerChannel$]);

  return (
    !stop && (
      <Styled.Container>
        <Styled.Timer
          style={{
            width: timerAnim.interpolate({
              inputRange: [0, 100],
              outputRange: ['100%', '0%'],
            }),
          }}
        />
      </Styled.Container>
    )
  );
});

export default PlayerTimer;
