import { take } from 'rxjs/operators';
import { GameEventType } from '@core/constants/game-event-type.constants';
import { MessageType } from '@core/constants/message-type.constants';
import { PlayerEvents } from '@core/constants/player-events.constants';
import { GameCommands } from '../game-commands.class';
import { GameController } from '../game-controller.service';

GameCommands.defineCommand(MessageType.Stake, function (this: GameController, args: string[]): void {
  this.subscriptions.push(
    this.currentPlayer$.pipe(take(1)).subscribe((player) => {
      if (player) {
        this.emitEvent(GameEventType.PlayerAction, {
          event: PlayerEvents.Stake,
          nominal: args[1] === '+',
          stake: args[2] === '+',
          pass: args[3] === '+',
          allIn: args[4] === '+',
          min: +args[5],
          max: player.sum,
        });
      }
    }),
  );
});
