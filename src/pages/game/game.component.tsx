import React, { useEffect } from 'react';
import { BackgroundContainer } from '@core/components/background-container';
import { useGameController } from '@core/hooks/use-game-controller.hook';
import { useNavigation } from '@react-navigation/core';
import { ButtonFooter } from './components/button-footer';
import { ChatHeader } from './components/chat-header';
import GameBody from './components/game-body/game-body.component';
import { GameToastContainer } from './components/game-toast-container';
import { PlayerEvents } from './components/player-events';
import { UserAction } from './components/user-action';
import * as Styled from './game.styles';

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
        <UserAction />
        <PlayerEvents />
        <ButtonFooter />
        <GameToastContainer />
      </Styled.Container>
    </BackgroundContainer>
  );
};

export default Game;
