import React, { FC, memo, useRef, useEffect } from 'react';
import Sound from 'react-native-sound';
import { merge } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TimerCommand } from '@core/constants/timer-command.constants';
import { useGameController } from '@core/hooks/use-game-controller.hook';
import { useService } from '@core/hooks/use-service.hook';
import { ToastsService } from '@core/services/toasts/toasts.service';
import * as Styled from './audio-atom.styles';
import { AudioAtomProps } from './audio-atom.types';

const AudioAtom: FC<AudioAtomProps> = memo(({ uri }) => {
  const { showToast } = useService(ToastsService);
  const [{ pauseChannel$, timerChannel$ }] = useGameController();
  const trackRef = useRef<Sound>();

  useEffect(() => {
    const subscription = merge(
      pauseChannel$,
      timerChannel$.pipe(
        filter(({ command }) =>
          [TimerCommand.UserPause, TimerCommand.UserResume, TimerCommand.Resume, TimerCommand.Pause].includes(command),
        ),
        map(({ command }) => [TimerCommand.UserPause, TimerCommand.Pause].includes(command)),
      ),
    ).subscribe((isPause) => {
      if (isPause) {
        trackRef.current?.pause();
      } else {
        trackRef.current?.play();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [pauseChannel$, timerChannel$]);

  useEffect(() => {
    if (!trackRef.current) {
      trackRef.current = new Sound(uri, null, (error) => {
        if (error) {
          showToast({
            type: 'danger',
            text: error,
          });
        } else {
          trackRef.current.play();
        }
      }).setNumberOfLoops(0);
    }
    return () => {
      if (trackRef.current) {
        trackRef.current.release();
      }
    };
  }, [showToast, uri]);

  return (
    <Styled.Container>
      <Styled.NoteText>𝄞</Styled.NoteText>
    </Styled.Container>
  );
});

export default AudioAtom;
