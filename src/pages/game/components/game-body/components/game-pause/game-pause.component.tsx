import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { map } from 'rxjs/operators';
import { GameEventType } from '@core/constants/game-event-type.constants';
import { useGameController } from '@core/hooks/use-game-controller.hook';
import useSubscription from '@core/hooks/use-subscription.hook';
import * as Styled from './game-pause.styles';

const GamePause: FC = () => {
  const [{ listen }] = useGameController();
  const [t] = useTranslation();
  const isPause = useSubscription(listen(GameEventType.Pause).pipe(map((item) => item.data)), false);

  return isPause ? (
    <Styled.Container>
      <Styled.PauseText>{t('game.pause')}</Styled.PauseText>
    </Styled.Container>
  ) : null;
};

export default GamePause;
