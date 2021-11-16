import { MessageType } from '@core/constants/message-type.constants';
import { GameCommands } from '../game-commands.class';
import { GameController } from '../game-controller.service';

GameCommands.defineCommand(MessageType.Disconnect, function (this: GameController): void {
  this.addChatMessage(this.translation.t('game.connectionLost'));
});
