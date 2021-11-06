import React, { FC, memo } from 'react';
import * as Styled from './video-atom.styles';
import { VideoAtomProps } from './video-atom.types';

const VideoAtom: FC<VideoAtomProps> = memo(({ uri }) => {
  return <Styled.QuestionVideo resizeMode="contain" source={{ uri }} />;
});

export default VideoAtom;
