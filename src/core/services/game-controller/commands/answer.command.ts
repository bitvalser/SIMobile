import { MessageType } from '@core/constants/message-type.constants';
import { PlayerEvents } from '@core/constants/player-events.constants';
import { GameCommands } from '../game-commands.class';
import { GameController } from '../game-controller.service';

GameCommands.defineCommand(MessageType.Answer, function (this: GameController): void {
  this.playerAction$.next({
    event: PlayerEvents.Answer,
  });
});
