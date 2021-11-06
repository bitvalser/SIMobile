import React, { FC } from 'react';
import { useGameController } from '@core/hooks/use-game-controller.hook';
import useSubscription from '@core/hooks/use-subscription.hook';
import { AtomType } from '@core/constants/atom-type.constants';
import * as Styled from './game-atom.styles';
import { VideoAtom } from './components/video-atom';
import { AudioAtom } from './components/audio-atom';

const GameAtom: FC = () => {
  const [{ atom$ }] = useGameController();
  const atom = useSubscription(atom$);

  return (
    atom && (
      <Styled.Container>
        {atom.type === AtomType.Text && <Styled.QuestionText>{atom.data}</Styled.QuestionText>}
        {atom.type === AtomType.Partial && <Styled.QuestionText>{atom.data}</Styled.QuestionText>}
        {atom.type === AtomType.Image && (
          <Styled.QuestionImage resizeMode="contain" fadeDuration={0} source={{ uri: atom.data }} />
        )}
        {atom.type === AtomType.Video && <VideoAtom uri={atom.data} />}
        {atom.type === AtomType.Voice && <AudioAtom uri={atom.data} />}
      </Styled.Container>
    )
  );
};

export default GameAtom;