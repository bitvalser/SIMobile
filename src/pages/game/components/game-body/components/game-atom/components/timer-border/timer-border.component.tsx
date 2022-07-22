import React, { FC, useEffect, memo, useState } from 'react';
import { merge } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { GameEventType } from '@core/constants/game-event-type.constants';
import { TimerCommand } from '@core/constants/timer-command.constants';
import { useGameController } from '@core/hooks/use-game-controller.hook';
import { useTimerAnimation } from '@core/hooks/use-timer-animation.hook';
import * as Styled from './timer-border.styles';

const TimerBorder: FC = memo(() => {
  const [{ timerMaxTime$, showTimerBorder$, listen }] = useGameController();
  const [showBorder, setShowBorder] = useState(false);
  const [timerAnim, startTimer, pauseTimer, , isStarted] = useTimerAnimation(timerMaxTime$.getValue() * 100);

  useEffect(() => {
    const subscriptionPause = listen(GameEventType.Timer).subscribe(({ data: isPaused }) => {
      if (isPaused) {
        pauseTimer();
      } else if (isStarted()) {
        startTimer();
      }
    });
    const subscriptionTry = merge(
      listen(GameEventType.CanTry).pipe(map((item) => item.data)),
      showTimerBorder$,
    ).subscribe((isBorder) => {
      setShowBorder(isBorder);
    });
    return () => {
      subscriptionPause.unsubscribe();
      subscriptionTry.unsubscribe();
    };
  }, [showTimerBorder$, pauseTimer, startTimer, isStarted, listen]);

  useEffect(() => {
    const subscription = listen(GameEventType.Timer)
      .pipe(map((item) => item.data))
      .pipe(filter(({ index }) => index === 1))
      .subscribe(({ command }) => {
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
  }, [listen, pauseTimer, startTimer, timerAnim]);

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
