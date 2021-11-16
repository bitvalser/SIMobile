import { GameShowMode } from '@core/constants/game-show-mode.constants';
import { GameStage } from '@core/constants/game-stage.constants';
import { MessageType } from '@core/constants/message-type.constants';
import { GameCommands } from '../game-commands.class';
import { GameController } from '../game-controller.service';

GameCommands.defineCommand(MessageType.RoundThemes, function (this: GameController, args: string[]): void {
  const currentThemes = this.roundThemes$.getValue();
  this.roundThemes$.next(
    args.slice(2).map((round, i) => ({
      ...(currentThemes[i] || {}),
      originalIndex: i,
      name: round,
    })),
  );
  if (args[1] === '+') {
    if (this.gameStage$.getValue() === GameStage.Final) {
      this.showMode$.next(GameShowMode.FinalThemes);
    } else {
      this.showMode$.next(GameShowMode.RoundThemes);
    }
  }
});
