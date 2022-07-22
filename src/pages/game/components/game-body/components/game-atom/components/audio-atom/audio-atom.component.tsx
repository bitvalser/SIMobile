import React, { FC, memo, useRef, useEffect } from 'react';
import Sound from 'react-native-sound';
import { merge } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { GameEventType } from '@core/constants/game-event-type.constants';
import { TimerCommand } from '@core/constants/timer-command.constants';
import { useGameController } from '@core/hooks/use-game-controller.hook';
import { useService } from '@core/hooks/use-service.hook';
import { SoundsService } from '@core/services/sounds/sounds.service';
import * as Styled from './audio-atom.styles';
import { AudioAtomProps } from './audio-atom.types';

const AudioAtom: FC<AudioAtomProps> = memo(({ musicId }) => {
  const { getMusic, releaseMusic } = useService(SoundsService);
  const [{ listen, mediaEnd }] = useGameController();
  const trackRef = useRef<Sound>();

  useEffect(() => {
    const subscription = merge(
      listen(GameEventType.Resume).pipe(map(() => false)),
      listen(GameEventType.Pause).pipe(map((item) => item.data)),
      listen(GameEventType.Timer).pipe(
        map((item) => item.data),
        filter(({ command }) =>
          [TimerCommand.UserPause, TimerCommand.UserResume, TimerCommand.Resume, TimerCommand.Pause].includes(command),
        ),
        map(({ command }) => [TimerCommand.UserPause, TimerCommand.Pause].includes(command)),
      ),
    ).subscribe((isPause) => {
      if (isPause) {
        trackRef.current?.pause();
      } else {
        trackRef.current?.play(() => {
          releaseMusic(musicId);
          mediaEnd();
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [listen, mediaEnd, musicId, releaseMusic]);

  useEffect(() => {
    if (!trackRef.current) {
      getMusic(musicId).then((sound) => {
        trackRef.current = sound
          .play(() => {
            releaseMusic(musicId);
            mediaEnd();
          })
          .setNumberOfLoops(0);
      });
    }
    return () => {
      releaseMusic(musicId);
    };
  }, [getMusic, mediaEnd, musicId, releaseMusic]);

  return (
    <Styled.Container>
      <Styled.NoteText>𝄞</Styled.NoteText>
    </Styled.Container>
  );
});

export default AudioAtom;
