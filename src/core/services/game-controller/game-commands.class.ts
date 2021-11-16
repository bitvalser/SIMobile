import { MessageType } from '@core/constants/message-type.constants';
import { GameController } from './game-controller.service';

export class GameCommands {
  static COMMANDS_MAP: { [key in MessageType]?: (this: GameController, args: string[]) => void } = {};
  static defineCommand(
    type: MessageType | MessageType[],
    handle: (this: GameController, args: string[]) => void,
  ): void {
    if (Array.isArray(type)) {
      type.forEach((key) => {
        GameCommands.COMMANDS_MAP[key] = handle;
      });
    } else {
      GameCommands.COMMANDS_MAP[type] = handle;
    }
  }
  static run(this: GameController, type: MessageType, args: string[]): void {
    if (GameCommands.COMMANDS_MAP[type]) {
      GameCommands.COMMANDS_MAP[type].call(this, args);
    }
  }
}
