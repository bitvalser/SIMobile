import { MessageType } from '@core/constants/message-type.constants';
import { AvatarState } from '@pages/game/components/player-avatar/player-avatar.types';
import { GameCommands } from '../game-commands.class';
import { GameController } from '../game-controller.service';

GameCommands.defineCommand(MessageType.FinalThink, function (this: GameController): void {
  this.players$.getValue().forEach(({ name }) => {
    this.userAvatarState$.next({ name, state: AvatarState.Default });
  });
});
