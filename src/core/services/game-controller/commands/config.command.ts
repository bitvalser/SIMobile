import { ConfigCommand } from '@core/constants/config-command.constants';
import { MessageType } from '@core/constants/message-type.constants';
import { GameCommands } from '../game-commands.class';
import { GameController } from '../game-controller.service';

GameCommands.defineCommand(MessageType.Config, function (this: GameController, args: string[]): void {
  const configType = args[1] as ConfigCommand;
  switch (configType) {
    case ConfigCommand.AddTable:
      this.players$.next([
        ...this.players$.getValue(),
        {
          name: args[2],
          isMale: args[3] === '+',
          isConnected: args[4] === '+',
          isHuman: args[5] === '+',
          isReady: args[6] === '+',
        },
      ]);
      break;
    case ConfigCommand.DeleteTable:
      this.players$.next(this.players$.getValue().filter((_, i) => i !== +args[2]));
      break;
    default:
      // TODO: add config commands support
      this.toastsService.showToast({
        type: 'danger',
        text: this.translation.t('game.commandConfigNotSupported'),
      });
  }
});
