import { MessageType } from '@core/constants/message-type.constants';
import { PlayerEvents } from '@core/constants/player-events.constants';
import { GameCommands } from '../game-commands.class';
import { GameController } from '../game-controller.service';

GameCommands.defineCommand(MessageType.IsRight, function (this: GameController, args: string[]): void {
  this.playerAction$.next({
    event: PlayerEvents.Appeal,
    answer: args[1],
    rightAnswers: args.slice(2),
    name: this.lastAnswer$.getValue()?.name || '',
  });
});
