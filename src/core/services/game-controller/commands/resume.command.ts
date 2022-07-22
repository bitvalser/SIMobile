import { GameEventType } from '@core/constants/game-event-type.constants';
import { MessageType } from '@core/constants/message-type.constants';
import { GameCommands } from '../game-commands.class';
import { GameController } from '../game-controller.service';

GameCommands.defineCommand(MessageType.Resume, function (this: GameController): void {
  this.emitEvent(GameEventType.Resume, true);
});
