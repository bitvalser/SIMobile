import React, { FC } from 'react';
import { filter, scan } from 'rxjs/operators';
import { AtomType } from '@core/constants/atom-type.constants';
import { useGameController } from '@core/hooks/use-game-controller.hook';
import useSubscription from '@core/hooks/use-subscription.hook';
import * as Styled from './partial-atom.styles';

const PartialAtom: FC = () => {
  const [{ atom$ }] = useGameController();
  const text = useSubscription(
    atom$.pipe(
      filter((atom) => atom?.type === AtomType.Partial),
      scan((acc, { data }) => `${acc}${data}`, ''),
    ),
    '',
  );

  return <Styled.QuestionText>{text}</Styled.QuestionText>;
};

export default PartialAtom;
