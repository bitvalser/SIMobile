import React, { FC } from 'react';
import { AtomType } from '@core/constants/atom-type.constants';
import { useGameController } from '@core/hooks/use-game-controller.hook';
import useSubscription from '@core/hooks/use-subscription.hook';
import { AudioAtom } from './components/audio-atom';
import { PartialAtom } from './components/partial-atom';
import { TimerBorder } from './components/timer-border';
import { VideoAtom } from './components/video-atom';
import * as Styled from './game-atom.styles';

const GameAtom: FC = () => {
  const [{ atom$ }] = useGameController();
  const atom = useSubscription(atom$);

  return (
    atom && (
      <Styled.Container>
        {atom.type === AtomType.Text && atom.data && <Styled.QuestionText>{atom.data}</Styled.QuestionText>}
        {atom.type === AtomType.Partial && <PartialAtom />}
        {atom.type === AtomType.Image && (
          <Styled.QuestionImage resizeMode="contain" fadeDuration={0} source={{ uri: atom.data }} />
        )}
        {atom.type === AtomType.Video && <VideoAtom uri={atom.data} />}
        {atom.type === AtomType.Voice && <AudioAtom musicId={atom.data} />}
        <TimerBorder />
      </Styled.Container>
    )
  );
};

export default GameAtom;
