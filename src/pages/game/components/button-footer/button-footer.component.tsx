import React, { FC, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppButton } from '@core/components/button';
import { GameStage } from '@core/constants/game-stage.constants';
import { useGameController } from '@core/hooks/use-game-controller.hook';
import useSubscription from '@core/hooks/use-subscription.hook';
import * as Styled from './button-footer.styles';

const DISABLED_DELAY = 3000;

const ButtonFooter: FC = () => {
  const [{ currentPlayer$, tryAnswer, ready, gameStage$ }] = useGameController();
  const currentPlayer = useSubscription(currentPlayer$);
  const [t] = useTranslation();
  const gameStage = useSubscription(gameStage$);
  const [disabled, setDisabled] = useState(false);
  const timerRef = useRef(null);

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

  const handleReady = (value: boolean) => () => {
    ready(value);
  };

  return currentPlayer ? (
    <Styled.Container>
      {gameStage === GameStage.Before ? (
        <>
          {currentPlayer.isReady ? (
            <Styled.ReadyContainer>
              <Styled.ReadyText>{t('game.ready')}</Styled.ReadyText>
              <Styled.CloseWrapper onPress={handleReady(false)}>
                <Styled.CloseText>✕</Styled.CloseText>
              </Styled.CloseWrapper>
            </Styled.ReadyContainer>
          ) : (
            <AppButton fullWidth text={t('game.ready')} onPress={handleReady(true)} />
          )}
        </>
      ) : (
        <Styled.TryButton disabled={disabled} onPress={handleTry} />
      )}
    </Styled.Container>
  ) : null;
};

export default ButtonFooter;
