import { take } from 'rxjs/operators';
import { MessageType } from '@core/constants/message-type.constants';
import { GameCommands } from '../game-commands.class';
import { GameController } from '../game-controller.service';

GameCommands.defineCommand(MessageType.SetChooser, function (this: GameController, args: string[]): void {
  this.subscriptions.push(
    this.currentPlayerIndex$.pipe(take(1)).subscribe((index) => {
      if (index >= 0 && index === +args[1]) {
        this.yourQuestionChoice$.next(true);
      }
    }),
  );
});
