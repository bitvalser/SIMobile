import React from 'react';
import { Text } from 'react-native';
import { BackgroundContainer } from '@core/components/background-container';
import { useRoute } from '@react-navigation/core';
import { GameRouteProp } from './game.types';

const Game = () => {
  const {
    params: { gameId },
  } = useRoute<GameRouteProp>();

  return (
    <BackgroundContainer>
      <Text>Game {gameId}</Text>
    </BackgroundContainer>
  );
};

export default Game;
