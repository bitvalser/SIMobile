import { MessageType } from '@core/constants/message-type.constants';
import { PlayerEvents } from '@core/constants/player-events.constants';
import { take } from 'rxjs/operators';
import { GameCommands } from '../game-commands.class';
import { GameController } from '../game-controller.service';

GameCommands.defineCommand(MessageType.FinalStake, function (this: GameController): void {
  this.subscriptions.push(
    this.currentPlayer$.pipe(take(1)).subscribe((player) => {
      if (player) {
        this.playerAction$.next({
          event: PlayerEvents.Final,
          max: player.sum,
        });
      }
    }),
  );
});
