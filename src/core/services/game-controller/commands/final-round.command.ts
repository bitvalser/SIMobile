import { MessageType } from '@core/constants/message-type.constants';
import { GameCommands } from '../game-commands.class';
import { GameController } from '../game-controller.service';

GameCommands.defineCommand(MessageType.FinalRound, function (this: GameController, args: string[]): void {
  this.players$.next(
    this.players$.getValue().map((item, i) => ({
      ...item,
      inFinal: args[i + 1] === '+',
    })),
  );
});
