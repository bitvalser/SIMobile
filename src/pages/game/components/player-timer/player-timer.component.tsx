import React, { FC, useEffect, memo, useState } from 'react';
import { filter, map } from 'rxjs/operators';
import { GameEventType } from '@core/constants/game-event-type.constants';
import { TimerCommand } from '@core/constants/timer-command.constants';
import { useGameController } from '@core/hooks/use-game-controller.hook';
import { useTimerAnimation } from '@core/hooks/use-timer-animation.hook';
import * as Styled from './player-timer.styles';
import { PlayerTimerProps } from './player-timer.types';

const PlayerTimer: FC<PlayerTimerProps> = memo(({ name, initialTime = 0 }) => {
  const [{ listen }] = useGameController();
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
    const subscription = listen(GameEventType.Pause).subscribe(({ data: isPaused }) => {
      if (isPaused) {
        pauseTimer();
      } else {
        startTimer();
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [listen, pauseTimer, startTimer]);

  useEffect(() => {
    const subscription = listen(GameEventType.Timer)
      .pipe(
        map((item) => item.data),
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
  }, [listen, name, pauseTimer, resetTimer, startTimer, timerAnim]);

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
