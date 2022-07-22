import { GameEventType } from '@core/constants/game-event-type.constants';
import { GameShowMode } from '@core/constants/game-show-mode.constants';
import { MessageType } from '@core/constants/message-type.constants';
import { GameCommands } from '../game-commands.class';
import { GameController } from '../game-controller.service';

GameCommands.defineCommand(MessageType.Replic, function (this: GameController, args: string[]): void {
  if (args.length < 3) {
    return;
  }
  const replicType = args[1][0];
  switch (replicType) {
    case 's':
      this.toastsService.showToast({
        container: 'game',
        type: 'info',
        text: args[2],
        delay: 3000,
      });
      break;
    case 'p': {
      const player = this.players$.getValue()?.[+args[1][1]];
      if (player) {
        this.emitEvent(GameEventType.UserReplic, {
          name: player.name,
          text: args[2],
        });
      }
      break;
    }
    case 'l':
      break;
    case 't':
      if (!this.atom$.getValue()) {
        this.gameReplic$.next(args[2]);
        this.showMode$.next(GameShowMode.Replic);
      }
      break;
    default:
      this.addChatMessage(args[2]);
      break;
  }
});
