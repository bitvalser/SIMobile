import { MessageType } from '@core/constants/message-type.constants';
import { GameCommands } from '../game-commands.class';
import { GameController } from '../game-controller.service';

GameCommands.defineCommand(MessageType.Connected, function (this: GameController, args: string[]): void {
  const role = args[1];
  const index = +args[2];
  const newUser = {
    name: args[3],
    isConnected: true,
    isMale: args[4] === 'm',
    isHuman: true,
    isReady: false,
  };
  switch (role) {
    case 'master':
      this.gameMaster$.next(newUser);
      break;
    case 'player': {
      const currentPlayers = [...this.players$.getValue()];
      if (currentPlayers[index]) {
        currentPlayers.splice(index, 1, {
          ...newUser,
          sum: currentPlayers[index].sum,
        });
        this.players$.next(currentPlayers);
      }
      break;
    }
    case 'viewer': {
      const currentViewers = [...this.spectators$.getValue()];
      currentViewers.splice(index, 1, newUser);
      this.spectators$.next(currentViewers);
      break;
    }
  }
  this.addChatMessage(this.translation.t('game.userConnected').replace('{user}', newUser.name));
});
