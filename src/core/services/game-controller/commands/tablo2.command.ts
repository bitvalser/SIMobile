import { MessageType } from '@core/constants/message-type.constants';
import { GameCommands } from '../game-commands.class';
import { GameController } from '../game-controller.service';

GameCommands.defineCommand(MessageType.Tablo2, function (this: GameController, args: string[]): void {
  const currentThemes = this.roundThemes$.getValue();
  const prices = args
    .slice(1)
    .reduce<number[][]>(
      (acc, val) => {
        if (val !== '') {
          acc[acc.length - 1].push(+val);
        } else {
          acc.push([]);
        }
        return acc;
      },
      [[]],
    )
    .filter((arr) => arr.length > 0);
  this.roundThemes$.next(
    prices.map((item, i) => ({
      ...(currentThemes[i] || {}),
      originalIndex: i,
      questions: item,
    })),
  );
});
