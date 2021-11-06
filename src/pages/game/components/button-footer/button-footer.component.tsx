import React, { FC } from 'react';
import { useGameController } from '@core/hooks/use-game-controller.hook';
import useSubscription from '@core/hooks/use-subscription.hook';
import * as Styled from './button-footer.styles';

const ButtonFooter: FC = () => {
  const [{ currentPlayer$ }] = useGameController();
  const currentPlayer = useSubscription(currentPlayer$);

  const handleTry = () => {};

  return <Styled.Container>{currentPlayer && <Styled.TryButton onPress={handleTry} />}</Styled.Container>;
};

export default ButtonFooter;
