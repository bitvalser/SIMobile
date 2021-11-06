import { useGameController } from '@core/hooks/use-game-controller.hook';
import useSubscription from '@core/hooks/use-subscription.hook';
import React, { FC } from 'react';
import { filter, map } from 'rxjs/operators';
import { ThemeItem } from './components/theme-item';
import * as Styled from './game-table.styles';

const GameTable: FC = () => {
  const [{ roundThemes$ }] = useGameController();
  const themes = useSubscription(
    roundThemes$.pipe(
      filter((data) => data.length > 0 && data.some(({ questions }) => questions.length > 0)),
      map((data) => data.filter(({ questions }) => questions.length > 0)),
    ),
    [],
  );

  return (
    <Styled.Container>
      <Styled.ThemesList
        data={themes}
        renderItem={({ item, index }) => <ThemeItem theme={item.name} prices={item.questions} themeIndex={index} />}
        keyExtractor={(_, index) => index.toString()}
      />
    </Styled.Container>
  );
};

export default GameTable;
