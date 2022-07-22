import React, { FC } from 'react';
import { GameShowMode } from '@core/constants/game-show-mode.constants';
import { useGameController } from '@core/hooks/use-game-controller.hook';
import useSubscription from '@core/hooks/use-subscription.hook';
import { GameReplic } from '../game-replic';
import { GameThemes } from '../game-themes';
import { RoundThemes } from '../round-themes';
import { FinalThemes } from './components/final-themes';
import { GameAnswer } from './components/game-answer';
import { GameAtom } from './components/game-atom';
import GamePause from './components/game-pause/game-pause.component';
import { GameTable } from './components/game-table';
import { QuestionPreview } from './components/question-preview';
import { ShowLogo } from './components/show-logo';
import * as Styled from './game-body.styles';

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
      {showMode === GameShowMode.GameThemes && <GameThemes />}
      {showMode === GameShowMode.Replic && <GameReplic />}
      {showMode === GameShowMode.RoundThemes && <RoundThemes />}
      {showMode === GameShowMode.FinalThemes && <FinalThemes />}
      {showMode === GameShowMode.Logo && <ShowLogo />}
      <GamePause />
    </Styled.Container>
  );
};

export default GameBody;
