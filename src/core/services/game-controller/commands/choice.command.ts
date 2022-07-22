import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { GameEventType } from '@core/constants/game-event-type.constants';
import { MessageType } from '@core/constants/message-type.constants';
import { AvatarState } from '@pages/game/components/player-avatar/player-avatar.types';
import { GameCommands } from '../game-commands.class';
import { GameController } from '../game-controller.service';

export const QUESTION_SELECTED_DELAY = 2000;

GameCommands.defineCommand(MessageType.Choice, function (this: GameController, args: string[]): void {
  const themeIndex = +args[1];
  const questionIndex = +args[2];
  this.emitEvent(GameEventType.QuestionSelected, [themeIndex, questionIndex]);
  this.subscriptions.push(
    of([themeIndex, questionIndex])
      .pipe(delay(QUESTION_SELECTED_DELAY))
      .subscribe(([theme, question]) => {
        const currentRound = [...this.roundThemes$.getValue()];
        currentRound[theme].questions.splice(question, 1, -1);
        this.roundThemes$.next(currentRound);
      }),
  );
  this.players$.getValue().forEach(({ name }) => {
    this.userAvatarState$.next({ name, state: AvatarState.Default });
  });
});
