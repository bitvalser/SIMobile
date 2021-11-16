import { MessageType } from '@core/constants/message-type.constants';
import { GameCommands } from '../game-commands.class';
import { GameController } from '../game-controller.service';

GameCommands.defineCommand(MessageType.Disconnected, function (this: GameController, args: string[]): void {
  const name = args[1];
  if (this.gameMaster$.getValue()?.name === name) {
    this.gameMaster$.next(null);
  } else if (this.players$.getValue()?.some(({ name: userName }) => userName === name)) {
    this.players$.next(
      this.players$.getValue().map((user) => ({
        ...user,
        ...(user.name === name
          ? {
              isConnected: false,
              avatar: null,
              name: '',
            }
          : {}),
      })),
    );
  } else if (this.spectators$.getValue()?.some(({ name: userName }) => userName === name)) {
    this.spectators$.next(this.spectators$.getValue().filter(({ name: userName }) => userName !== name));
  }
  this.addChatMessage(this.translation.t('game.userDisconnected').replace('{user}', name));
});
