import { GameShowMode } from '@core/constants/game-show-mode.constants';
import { MessageType } from '@core/constants/message-type.constants';
import { GameAnswer } from '@core/interfaces/game-answer.interface';
import { GameCommands } from '../game-commands.class';
import { GameController } from '../game-controller.service';

GameCommands.defineCommand(MessageType.RightAnswer, function (this: GameController, args: string[]): void {
  this.rightAnswer$.next({
    type: args[1] as GameAnswer['type'],
    data: args[2],
  });
  this.showMode$.next(GameShowMode.Answer);
});
