import React, { FC, memo, useEffect, useRef } from 'react';
import Video from 'react-native-video';
import { merge } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { GameEventType } from '@core/constants/game-event-type.constants';
import { TimerCommand } from '@core/constants/timer-command.constants';
import { useGameController } from '@core/hooks/use-game-controller.hook';
import * as Styled from './video-atom.styles';
import { VideoAtomProps } from './video-atom.types';

const BUFF_CONFIG = {
  minBufferMs: 2000,
  maxBufferMs: 50000,
  bufferForPlaybackMs: 2500,
  bufferForPlaybackAfterRebufferMs: 2000,
};

const VideoAtom: FC<VideoAtomProps> = memo(({ uri }) => {
  const [{ listen, mediaEnd }] = useGameController();
  const videoRef = useRef<Video>();

  useEffect(() => {
    const subscription = merge(
      listen(GameEventType.Pause).pipe(map((item) => item.data)),
      listen(GameEventType.Resume).pipe(map(() => false)),
      listen(GameEventType.Timer).pipe(
        map((item) => item.data),
        filter(({ command }) =>
          [TimerCommand.UserPause, TimerCommand.UserResume, TimerCommand.Resume, TimerCommand.Pause].includes(command),
        ),
        map(({ command }) => [TimerCommand.UserPause, TimerCommand.Pause].includes(command)),
      ),
    ).subscribe((isPause) => {
      videoRef.current?.setNativeProps({ paused: isPause });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [listen]);

  return (
    <Styled.QuestionVideo
      ref={videoRef}
      buffConfig={BUFF_CONFIG}
      repeat={false}
      onEnd={mediaEnd}
      resizeMode="contain"
      source={{ uri }}
    />
  );
});

export default VideoAtom;
