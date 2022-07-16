import { MessageType } from '@core/constants/message-type.constants';
import { GameCommands } from '../game-commands.class';
import { GameController } from '../game-controller.service';

GameCommands.defineCommand(MessageType.RoundContent, function (this: GameController, args: string[]): void {
  console.log(this.appSettingsService.getSetting('preloadResources'));
  if (this.appSettingsService.getSetting('preloadResources')) {
    const assets = args.slice(1).map((url) => url.replace('<SERVERHOST>', this.publicUrl));
    console.log(assets);
    this.assetsService.clear();
    assets.forEach((url) => {
      this.assetsService.fetchResource(url);
    });
  }
});
