import { GameShowMode } from '@core/constants/game-show-mode.constants';
import { MessageType } from '@core/constants/message-type.constants';
import { GameCommands } from '../game-commands.class';
import { GameController } from '../game-controller.service';

GameCommands.defineCommand(MessageType.ShowTablo, function (this: GameController): void {
  this.showMode$.next(GameShowMode.Tablo);
  this.clearInfoState();
});
