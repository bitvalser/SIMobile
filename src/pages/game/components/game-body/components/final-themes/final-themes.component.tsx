import React, { FC } from 'react';
import { LayoutAnimation } from 'react-native';
import { tap } from 'rxjs/operators';
import { AppButton } from '@core/components/button';
import { useGameController } from '@core/hooks/use-game-controller.hook';
import useSubscription from '@core/hooks/use-subscription.hook';
import * as Styled from './final-themes.styles';

const FinalThemes: FC = () => {
  const [{ roundThemes$, removeTheme, yourQuestionChoice$ }] = useGameController();
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
  const canRemove = useSubscription(yourQuestionChoice$, false);

  const handleRemove = (themeIndex: number) => () => {
    removeTheme(themeIndex);
  };

  return (
    <Styled.Container>
      {themes.map(({ originalIndex, name }) => (
        <AppButton disabled={!canRemove} onPress={handleRemove(originalIndex)} key={originalIndex} text={name} />
      ))}
    </Styled.Container>
  );
};

export default FinalThemes;
