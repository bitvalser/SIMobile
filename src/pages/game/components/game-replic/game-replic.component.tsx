import React, { FC } from 'react';
import { useGameController } from '@core/hooks/use-game-controller.hook';
import useSubscription from '@core/hooks/use-subscription.hook';
import * as Styled from './game-replic.styles';

const GameAnswer: FC = () => {
  const [{ gameReplic$ }] = useGameController();
  const relic = useSubscription(gameReplic$);

  return <Styled.Container>{relic && <Styled.ReplicText>{relic}</Styled.ReplicText>}</Styled.Container>;
};

export default GameAnswer;
