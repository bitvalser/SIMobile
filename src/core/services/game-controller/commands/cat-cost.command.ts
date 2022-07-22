import { GameEventType } from '@core/constants/game-event-type.constants';
import { MessageType } from '@core/constants/message-type.constants';
import { PlayerEvents } from '@core/constants/player-events.constants';
import { GameCommands } from '../game-commands.class';
import { GameController } from '../game-controller.service';

GameCommands.defineCommand(MessageType.CatCost, function (this: GameController, args: string[]): void {
  this.emitEvent(GameEventType.PlayerAction, {
    event: PlayerEvents.CatCost,
    min: +args[1],
    max: +args[2],
    step: +args[3],
  });
});
