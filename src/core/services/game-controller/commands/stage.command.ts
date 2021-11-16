import { GameShowMode } from '@core/constants/game-show-mode.constants';
import { GameStage } from '@core/constants/game-stage.constants';
import { MessageType } from '@core/constants/message-type.constants';
import { GameCommands } from '../game-commands.class';
import { GameController } from '../game-controller.service';

GameCommands.defineCommand(MessageType.Stage, function (this: GameController, args: string[]): void {
  const stage = args[1] as GameStage;
  this.gameStage$.next(stage);
  this.clearInfoState();
  switch (stage) {
    case GameStage.Before:
    case GameStage.After:
      this.showMode$.next(GameShowMode.Logo);
      break;
  }
});
