import React, { FC, useEffect, memo, useState } from 'react';
import { useGameController } from '@core/hooks/use-game-controller.hook';
import * as Styled from './player-timer.styles';
import { filter } from 'rxjs/operators';
import { TimerCommand } from '@core/constants/timer-command.constants';
import { PlayerTimerProps } from './player-timer.types';
import { useTimerAnimation } from '@core/hooks/use-timer-animation.hook';

const PlayerTimer: FC<PlayerTimerProps> = memo(({ name, initialTime = 0 }) => {
  const [{ timerChannel$, pauseChannel$ }] = useGameController();
  const [stop, setStop] = useState(initialTime === 0);
  const [timerAnim, startTimer, pauseTimer, resetTimer] = useTimerAnimation(initialTime);

  useEffect(() => {
    if (initialTime > 0) {
      setStop(false);
      resetTimer(initialTime * 100);
      startTimer();
    }
  }, [initialTime, resetTimer, startTimer, timerAnim]);

  useEffect(() => {
    const subscription = pauseChannel$.subscribe((isPaused) => {
      if (isPaused) {
        pauseTimer();
      } else {
        startTimer();
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [pauseChannel$, pauseTimer, startTimer]);

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
            resetTimer(time * 100);
            startTimer();
            break;
          case TimerCommand.Stop:
            setStop(true);
            break;
          case TimerCommand.Pause:
          case TimerCommand.UserPause:
            pauseTimer();
            break;
          case TimerCommand.Resume:
          case TimerCommand.UserResume:
            startTimer();
            break;
        }
      });
    return () => {
      subscription.unsubscribe();
    };
  }, [name, pauseTimer, resetTimer, startTimer, timerAnim, timerChannel$]);

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
