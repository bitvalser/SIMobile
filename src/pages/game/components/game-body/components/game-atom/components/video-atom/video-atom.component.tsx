import React, { FC, memo, useEffect, useRef } from 'react';
import { merge } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import Video from 'react-native-video';
import { useGameController } from '@core/hooks/use-game-controller.hook';
import * as Styled from './video-atom.styles';
import { VideoAtomProps } from './video-atom.types';
import { TimerCommand } from '@core/constants/timer-command.constants';

const BUFF_CONFIG = {
  minBufferMs: 2000,
  maxBufferMs: 50000,
  bufferForPlaybackMs: 2500,
  bufferForPlaybackAfterRebufferMs: 2000,
};

const VideoAtom: FC<VideoAtomProps> = memo(({ uri }) => {
  const [{ pauseChannel$, timerChannel$, mediaEnd }] = useGameController();
  const videoRef = useRef<Video>();

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
      videoRef.current?.setNativeProps({ paused: isPause });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [pauseChannel$, timerChannel$]);

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
