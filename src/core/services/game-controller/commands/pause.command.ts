import { GameEventType } from '@core/constants/game-event-type.constants';
import { MessageType } from '@core/constants/message-type.constants';
import { GameCommands } from '../game-commands.class';
import { GameController } from '../game-controller.service';

GameCommands.defineCommand(MessageType.Pause, function (this: GameController, args: string[]): void {
  if (args.length > 4) {
    this.emitEvent(GameEventType.Pause, args[1] === '+');
  }
});
