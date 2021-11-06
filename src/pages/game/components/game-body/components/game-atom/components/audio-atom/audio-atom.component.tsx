import { useService } from '@core/hooks/use-service.hook';
import { ToastsService } from '@core/services/toasts/toasts.service';
import React, { FC, memo, useRef, useEffect } from 'react';
import Sound from 'react-native-sound';
import * as Styled from './audio-atom.styles';
import { AudioAtomProps } from './audio-atom.types';

const AudioAtom: FC<AudioAtomProps> = memo(({ uri }) => {
  const { showToast } = useService(ToastsService);
  const trackRef = useRef<Sound>();

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
      });
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
