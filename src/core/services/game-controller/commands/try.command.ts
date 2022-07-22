import { GameEventType } from '@core/constants/game-event-type.constants';
import { MessageType } from '@core/constants/message-type.constants';
import { GameCommands } from '../game-commands.class';
import { GameController } from '../game-controller.service';

GameCommands.defineCommand(MessageType.Try, function (this: GameController, args: string[]): void {
  const withBorder = args.length > 1 && args[1] === 'NF';
  this.showTimerBorder$.next(withBorder);
  this.emitEvent(GameEventType.CanTry, withBorder);
});
