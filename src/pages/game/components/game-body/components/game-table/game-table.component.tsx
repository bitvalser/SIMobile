import React, { FC } from 'react';
import { filter, map } from 'rxjs/operators';
import { useGameController } from '@core/hooks/use-game-controller.hook';
import useSubscription from '@core/hooks/use-subscription.hook';
import { ThemeItem } from './components/theme-item';
import * as Styled from './game-table.styles';

const GameTable: FC = () => {
  const [{ roundThemes$ }] = useGameController();
  const themes = useSubscription(
    roundThemes$.pipe(
      filter((data) => data.length > 0 && data.some((item) => item?.questions?.length > 0)),
      map((data) => data.filter(({ questions }) => questions.some((price) => price > 0))),
    ),
    [],
  );

  return (
    <Styled.Container>
      <Styled.ThemesList
        data={themes}
        renderItem={({ item, index }) => (
          <ThemeItem theme={item.name} index={index} prices={item.questions} themeIndex={item.originalIndex} />
        )}
        keyExtractor={(_, index) => index.toString()}
      />
    </Styled.Container>
  );
};

export default GameTable;
