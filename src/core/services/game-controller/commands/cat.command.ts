import { MessageType } from '@core/constants/message-type.constants';
import { PlayerEvents } from '@core/constants/player-events.constants';
import { GameCommands } from '../game-commands.class';
import { GameController } from '../game-controller.service';

GameCommands.defineCommand(MessageType.Cat, function (this: GameController, args: string[]): void {
  this.playerAction$.next({
    event: PlayerEvents.Cat,
    players: args.slice(1).map((item) => item === '+'),
  });
});
