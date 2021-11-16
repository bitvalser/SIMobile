import { GameShowMode } from '@core/constants/game-show-mode.constants';
import { MessageType } from '@core/constants/message-type.constants';
import { QuestionType } from '@core/constants/question-type.constants';
import { GameCommands } from '../game-commands.class';
import { GameController } from '../game-controller.service';

GameCommands.defineCommand(MessageType.QuestionType, function (this: GameController, args: string[]): void {
  this.questionType$.next(args[1] as QuestionType);
  this.showMode$.next(GameShowMode.Question);
  this.userReplic$.next(null);
});
