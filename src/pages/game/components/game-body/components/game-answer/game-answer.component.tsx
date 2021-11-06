import React, { FC } from 'react';
import { useGameController } from '@core/hooks/use-game-controller.hook';
import useSubscription from '@core/hooks/use-subscription.hook';
import * as Styled from './game-answer.styles';

const GameAnswer: FC = () => {
  const [{ rightAnswer$ }] = useGameController();
  const answer = useSubscription(rightAnswer$);

  return (
    answer && (
      <Styled.Container>
        {answer.type === 'text' && <Styled.AnswerText>{answer.data}</Styled.AnswerText>}
      </Styled.Container>
    )
  );
};

export default GameAnswer;
