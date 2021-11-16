import React, { FC } from 'react';
import { ToastsContainer } from '@core/components/toasts-container';
import { useGameController } from '@core/hooks/use-game-controller.hook';
import useSubscription from '@core/hooks/use-subscription.hook';
import * as Styled from './game-toast-container.styles';

const GameToastContainer: FC = () => {
  const [{ currentPlayer$ }] = useGameController();
  const currentPlayer = useSubscription(currentPlayer$);

  return (
    <Styled.ToastsContainer bottomMargin={Boolean(currentPlayer)}>
      <ToastsContainer container="game" />
    </Styled.ToastsContainer>
  );
};

export default GameToastContainer;
