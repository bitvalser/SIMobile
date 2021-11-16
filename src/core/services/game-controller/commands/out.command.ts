import { MessageType } from '@core/constants/message-type.constants';
import { AppSound } from '@core/constants/sound.constants';
import { GameCommands } from '../game-commands.class';
import { GameController } from '../game-controller.service';

GameCommands.defineCommand(MessageType.Out, function (this: GameController, args: string[]): void {
  this.roundThemes$.next(this.roundThemes$.getValue().filter(({ originalIndex }) => originalIndex !== +args[1]));
  this.soundsService.getSound(AppSound.FinalDelete).play();
});
