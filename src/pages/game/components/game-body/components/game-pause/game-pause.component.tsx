import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useGameController } from '@core/hooks/use-game-controller.hook';
import useSubscription from '@core/hooks/use-subscription.hook';
import * as Styled from './game-pause.styles';

const GamePause: FC = () => {
  const [{ pauseChannel$ }] = useGameController();
  const [t] = useTranslation();
  const isPause = useSubscription(pauseChannel$, false);

  return (
    isPause && (
      <Styled.Container>
        <Styled.PauseText>{t('game.pause')}</Styled.PauseText>
      </Styled.Container>
    )
  );
};

export default GamePause;
