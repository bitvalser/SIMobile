import React, { FC, useEffect, useRef, useState } from 'react';
import { useGameController } from '@core/hooks/use-game-controller.hook';
import useSubscription from '@core/hooks/use-subscription.hook';
import * as Styled from './button-footer.styles';

const DISABLED_DELAY = 3000;

const ButtonFooter: FC = () => {
  const [{ currentPlayer$, tryAnswer }] = useGameController();
  const [disabled, setDisabled] = useState(false);
  const timerRef = useRef(null);
  const currentPlayer = useSubscription(currentPlayer$);

  useEffect(
    () => () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    },
    [],
  );

  const handleTry = () => {
    tryAnswer();
    setDisabled(true);
    timerRef.current = setTimeout(() => {
      setDisabled(false);
    }, DISABLED_DELAY);
  };

  return (
    <Styled.Container>{currentPlayer && <Styled.TryButton disabled={disabled} onPress={handleTry} />}</Styled.Container>
  );
};

export default ButtonFooter;
