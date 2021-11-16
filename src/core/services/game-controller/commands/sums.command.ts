import { MessageType } from '@core/constants/message-type.constants';
import { GameCommands } from '../game-commands.class';
import { GameController } from '../game-controller.service';

GameCommands.defineCommand(MessageType.Sums, function (this: GameController, args: string[]): void {
  this.players$.next(
    this.players$.getValue().map((player, i) => ({
      ...player,
      sum: +args[i + 1],
    })),
  );
});
