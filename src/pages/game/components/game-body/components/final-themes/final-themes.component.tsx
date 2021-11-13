import React, { FC, useEffect } from 'react';
import { AppButton } from '@core/components/button';
import { useGameController } from '@core/hooks/use-game-controller.hook';
import useSubscription from '@core/hooks/use-subscription.hook';
import * as Styled from './final-themes.styles';
import { LayoutAnimation } from 'react-native';
import { tap } from 'rxjs/operators';

const FinalThemes: FC = () => {
  const [{ roundThemes$ }] = useGameController();
  const themes = useSubscription(
    roundThemes$.pipe(
      tap(() => {
        LayoutAnimation.configureNext(
          LayoutAnimation.create(500, LayoutAnimation.Types.linear, LayoutAnimation.Properties.opacity),
        );
      }),
    ),
    [],
  );

  return (
    <Styled.Container>
      {themes.map(({ originalIndex, name }) => (
        <AppButton key={originalIndex} text={name} />
      ))}
    </Styled.Container>
  );
};

export default FinalThemes;
