import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { BackgroundContainer } from '@core/components/background-container';
import { useRoute } from '@react-navigation/core';
import { GameRouteProp } from './game.types';
import { useService } from '@core/hooks/use-service.hook';
import { SignalRClient } from '@core/services/signalr-client/signalr-client.service';
import { SignalEvent } from '@core/constants/signal-event.constants';

const Game = () => {
  const {
    params: { gameId },
  } = useRoute<GameRouteProp>();
  const { on } = useService(SignalRClient);

  useEffect(() => {
    on(SignalEvent.Receive).subscribe(console.log);
  }, [on]);

  return (
    <BackgroundContainer>
      <Text>Game {gameId}</Text>
    </BackgroundContainer>
  );
};

export default Game;
