import React, { FC, useEffect, memo, useState } from 'react';
import { merge } from 'rxjs';
import { useGameController } from '@core/hooks/use-game-controller.hook';
import * as Styled from './timer-border.styles';
import { filter } from 'rxjs/operators';
import { TimerCommand } from '@core/constants/timer-command.constants';
import { useTimerAnimation } from '@core/hooks/use-timer-animation.hook';

const TimerBorder: FC = memo(() => {
  const [{ timerChannel$, pauseChannel$, timerMaxTime$, canTry$, showTimerBorder$ }] = useGameController();
  const [showBorder, setShowBorder] = useState(false);
  const [timerAnim, startTimer, pauseTimer, , isStarted] = useTimerAnimation(timerMaxTime$.getValue() * 100);

  useEffect(() => {
    const subscriptionPause = pauseChannel$.subscribe((isPaused) => {
      if (isPaused) {
        pauseTimer();
      } else if (isStarted()) {
        startTimer();
      }
    });
    const subscriptionTry = merge(canTry$, showTimerBorder$).subscribe((isBorder) => {
      setShowBorder(isBorder);
    });
    return () => {
      subscriptionPause.unsubscribe();
      subscriptionTry.unsubscribe();
    };
  }, [pauseChannel$, canTry$, showTimerBorder$, pauseTimer, startTimer, isStarted]);

  useEffect(() => {
    const subscription = timerChannel$.pipe(filter(({ index }) => index === 1)).subscribe(({ command }) => {
      switch (command) {
        case TimerCommand.Pause:
          setShowBorder(false);
          pauseTimer();
          break;
        case TimerCommand.UserPause:
          pauseTimer();
          break;
        case TimerCommand.Resume:
        case TimerCommand.UserResume:
          setShowBorder(true);
          startTimer();
          break;
        case TimerCommand.Stop:
          setShowBorder(false);
          break;
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [pauseTimer, startTimer, timerAnim, timerChannel$]);

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
