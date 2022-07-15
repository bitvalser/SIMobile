import { MessageType } from '@core/constants/message-type.constants';
import { GameCommands } from '../game-commands.class';
import { GameController } from '../game-controller.service';

GameCommands.defineCommand(MessageType.Picture, function (this: GameController, args: string[]): void {
  this.players$.next(
    this.players$.getValue().map((user) => ({
      ...user,
      ...(user.name === args[1]
        ? {
            avatar: args[2].replace('<SERVERHOST>', this.publicUrl),
          }
        : {}),
    })),
  );
});
