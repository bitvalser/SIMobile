import { MessageType } from '@core/constants/message-type.constants';
import { GameCommands } from '../game-commands.class';
import { GameController } from '../game-controller.service';

GameCommands.defineCommand(MessageType.Choose, function (this: GameController): void {
  this.yourQuestionChoice$.next(true);
});
