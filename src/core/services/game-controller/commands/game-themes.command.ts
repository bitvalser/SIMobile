import { GameShowMode } from '@core/constants/game-show-mode.constants';
import { MessageType } from '@core/constants/message-type.constants';
import { GameCommands } from '../game-commands.class';
import { GameController } from '../game-controller.service';

GameCommands.defineCommand(MessageType.GameThemes, function (this: GameController, args: string[]): void {
  this.gameThemes$.next(args.slice(1));
  this.showMode$.next(GameShowMode.GameThemes);
});
