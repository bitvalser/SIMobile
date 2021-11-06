import React, { FC } from 'react';
import { useGameController } from '@core/hooks/use-game-controller.hook';
import useSubscription from '@core/hooks/use-subscription.hook';
import * as Styled from './game-body.styles';
import { GameShowMode } from '@core/constants/game-show-mode.constants';
import { GameTable } from './components/game-table';
import { GameAtom } from './components/game-atom';
import { GameAnswer } from './components/game-answer';
import { QuestionPreview } from './components/question-preview';

const GRADIENT_COLORS = ['#000451', '#183cf3', '#000451'];

const GameBody: FC = () => {
  const [{ showMode$ }] = useGameController();
  const showMode = useSubscription(showMode$);

  return (
    <Styled.Container colors={GRADIENT_COLORS} angle={180}>
      {showMode === GameShowMode.Tablo && <GameTable />}
      {showMode === GameShowMode.Atom && <GameAtom />}
      {showMode === GameShowMode.Answer && <GameAnswer />}
      {showMode === GameShowMode.Question && <QuestionPreview />}
    </Styled.Container>
  );
};

export default GameBody;
