import React, { FC, memo } from 'react';
import { ToastsContainer } from '@core/components/toasts-container';
import { useGameController } from '@core/hooks/use-game-controller.hook';
import useSubscription from '@core/hooks/use-subscription.hook';
import * as Styled from './game-toast-container.styles';
import { GameToastContainerProps } from './game-toast-container.types';
import { useService } from '@core/hooks/use-service.hook';
import { AppSettingsService } from '@core/services/settings/settings.service';

const GameToastContainer: FC<GameToastContainerProps> = memo(() => {
  const [{ currentPlayer$ }] = useGameController();
  const { getSetting } = useService(AppSettingsService);
  const currentPlayer = useSubscription(currentPlayer$);
  const position = getSetting('gameToastsPosition');

  console.log(position);

  return (
    <Styled.ToastsContainer bottomMargin={Boolean(currentPlayer)} position={position}>
      <ToastsContainer container="game" position={position} />
    </Styled.ToastsContainer>
  );
});

export default GameToastContainer;
