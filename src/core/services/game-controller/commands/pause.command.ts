import { MessageType } from '@core/constants/message-type.constants';
import { GameCommands } from '../game-commands.class';
import { GameController } from '../game-controller.service';

GameCommands.defineCommand(MessageType.Pause, function (this: GameController, args: string[]): void {
  if (args.length > 4) {
    this.pauseChannel$.next(args[1] === '+');
  }
});
