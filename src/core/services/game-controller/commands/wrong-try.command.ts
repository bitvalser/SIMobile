import { MessageType } from '@core/constants/message-type.constants';
import { AvatarState } from '@pages/game/components/player-avatar/player-avatar.types';
import { GameCommands } from '../game-commands.class';
import { GameController } from '../game-controller.service';

GameCommands.defineCommand(MessageType.WrongTry, function (this: GameController, args: string[]): void {
  const player = this.players$.getValue()?.[+args[1]];
  if (player) {
    this.userAvatarState$.next({
      name: player.name,
      state: AvatarState.WrongTry,
    });
  }
});
