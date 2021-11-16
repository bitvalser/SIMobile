import { MessageType } from '@core/constants/message-type.constants';
import { GameCommands } from '../game-commands.class';
import { GameController } from '../game-controller.service';

GameCommands.defineCommand(MessageType.Ready, function (this: GameController, args: string[]): void {
  if (args.length <= 2) {
    return;
  }
  const name = args[1];
  if (this.gameMaster$.getValue()?.name === name) {
    this.gameMaster$.next({
      ...this.gameMaster$.getValue(),
      isReady: args[2] === '+',
    });
  } else {
    this.players$.next(
      this.players$.getValue().map((user) => ({
        ...user,
        ...(user.name === name
          ? {
              isReady: args[2] === '+',
            }
          : {}),
      })),
    );
  }
});
