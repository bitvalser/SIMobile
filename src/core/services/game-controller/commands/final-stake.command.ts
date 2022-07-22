import { take } from 'rxjs/operators';
import { GameEventType } from '@core/constants/game-event-type.constants';
import { MessageType } from '@core/constants/message-type.constants';
import { PlayerEvents } from '@core/constants/player-events.constants';
import { GameCommands } from '../game-commands.class';
import { GameController } from '../game-controller.service';

GameCommands.defineCommand(MessageType.FinalStake, function (this: GameController): void {
  this.subscriptions.push(
    this.currentPlayer$.pipe(take(1)).subscribe((player) => {
      if (player) {
        this.emitEvent(GameEventType.PlayerAction, {
          event: PlayerEvents.Final,
          max: player.sum,
        });
      }
    }),
  );
});
