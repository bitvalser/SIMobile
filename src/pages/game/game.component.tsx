import React, { useEffect } from 'react';
import { BackgroundContainer } from '@core/components/background-container';
import { useGameController } from '@core/hooks/use-game-controller.hook';
import { useNavigation } from '@react-navigation/core';
import { ChatHeader } from './components/chat-header';
import * as Styled from './game.styles';
import GameBody from './components/game-body/game-body.component';
import { ButtonFooter } from './components/button-footer';

const Game = () => {
  const [gameController, leave] = useGameController();
  const navigation = useNavigation();

  useEffect(
    () => () => {
      leave();
    },
    [leave],
  );

  useEffect(() => {
    if (!gameController) {
      navigation.goBack();
    }
  }, [gameController, navigation]);

  return (
    <BackgroundContainer>
      <Styled.Container>
        <ChatHeader />
        <GameBody />
        <ButtonFooter />
      </Styled.Container>
    </BackgroundContainer>
  );
};

export default Game;
