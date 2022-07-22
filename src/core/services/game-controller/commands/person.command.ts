import { GameEventType } from '@core/constants/game-event-type.constants';
import { MessageType } from '@core/constants/message-type.constants';
import { AppSound } from '@core/constants/sound.constants';
import { AvatarState } from '@pages/game/components/player-avatar/player-avatar.types';
import { GameCommands } from '../game-commands.class';
import { GameController } from '../game-controller.service';

GameCommands.defineCommand(MessageType.Person, function (this: GameController, args: string[]): void {
  const isWon = args[1] === '+';
  const personIndex = +args[2];
  const player = this.players$.getValue()?.[personIndex];
  if (player) {
    this.userAvatarState$.next({
      name: player.name,
      state: isWon ? AvatarState.Success : AvatarState.Wrong,
    });
    this.players$.next(
      this.players$.getValue().map((user, index) => ({
        ...user,
        ...(index === personIndex
          ? {
              sum: user.sum + (isWon ? 1 : -1) * +args[3],
            }
          : {}),
      })),
    );
    this.lastAnswer$.next({
      name: player.name,
      isWon,
      sum: +args[3],
    });
    this.soundsService.getSound(isWon ? AppSound.ApplauseSmall : AppSound.AnswerWrong).play();
  }
  this.emitEvent(GameEventType.UserReplic, null);
});
