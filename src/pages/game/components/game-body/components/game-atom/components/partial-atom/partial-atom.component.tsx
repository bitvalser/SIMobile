import { AtomType } from '@core/constants/atom-type.constants';
import { useGameController } from '@core/hooks/use-game-controller.hook';
import useSubscription from '@core/hooks/use-subscription.hook';
import React, { FC } from 'react';
import { filter, reduce, scan, tap } from 'rxjs/operators';
import * as Styled from './partial-atom.styles';

const PartialAtom: FC = () => {
  const [{ atom$ }] = useGameController();
  const text = useSubscription(
    atom$.pipe(
      filter(({ type }) => type === AtomType.Partial),
      tap(console.log),
      scan((acc, { data }) => `${acc}${data}`, ''),
    ),
    '',
  );

  return <Styled.QuestionText>{text}</Styled.QuestionText>;
};

export default PartialAtom;
