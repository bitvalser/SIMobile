import { createContext } from 'react';
import MMKVStorage from 'react-native-mmkv-storage';
import { i18n } from 'i18next';
import { appConfig } from '@core/config/config';
import translation from '@core/i18n';
import { TYPES } from '@core/services/types';
import { Container, interfaces } from 'inversify';
import { ISiApiClient } from '@core/services/si-api-client/si-api-client.types';
import { SiApiClient } from '@core/services/si-api-client/si-api-client.service';
import { ISignalRClient } from '@core/services/signalr-client/signalr-client.types';
import { SignalRClient } from '@core/services/signalr-client/signalr-client.service';
import { IGamesService } from '@core/services/games/games-service.types';
import { GamesService } from '@core/services/games/games-service.service';
import { IModalsService } from '@core/services/modals/modals.types';
import { ModalsService } from '@core/services/modals/modals.service';
import { IToastsService } from '@core/services/toasts/toasts.types';
import { ToastsService } from '@core/services/toasts/toasts.service';
import { IGameController } from '@core/services/game-controller/game-controller.types';
import { GameController } from '@core/services/game-controller/game-controller.service';
import { SoundsService } from '@core/services/sounds/sounds.service';
import { ISoundsService } from '@core/services/sounds/sounds.types';
import { IAppSettingsService } from '@core/services/settings/settings.types';
import { AppSettingsService } from '@core/services/settings/settings.service';
import { ILogsService } from '@core/services/logs/logs.types';
import { LogsService } from '@core/services/logs/logs.service';
import { IAuthService } from '@core/services/auth/auth.types';
import { AuthService } from '@core/services/auth/auth.service';

const InversifyContext = createContext<interfaces.Container>(null);

const appContainer = new Container({ defaultScope: 'Singleton' });

appContainer.bind<MMKVStorage.API>(TYPES.Storage).toConstantValue(new MMKVStorage.Loader().initialize());
appContainer.bind<string>(TYPES.SiApiUrl).toConstantValue(appConfig.siApiUrl);
appContainer.bind<i18n>(TYPES.Translation).toConstantValue(translation);
appContainer.bind<ISiApiClient>(TYPES.SiApiClient).to(SiApiClient);
appContainer
  .bind<interfaces.Factory<string>>(TYPES.ServerUri)
  .toFactory<string>(({ container }) => () => container.get<ISiApiClient>(TYPES.SiApiClient).serverUri$.getValue());
appContainer
  .bind<interfaces.Factory<string>>(TYPES.AuthToken)
  .toFactory<string>(({ container }) => () => container.get<ISiApiClient>(TYPES.SiApiClient).authToken$.getValue());
appContainer.bind<ISignalRClient>(TYPES.SignalRClient).to(SignalRClient);
appContainer.bind<IGamesService>(TYPES.GamesService).to(GamesService);
appContainer.bind<IModalsService>(TYPES.ModalsService).to(ModalsService);
appContainer.bind<IToastsService>(TYPES.ToastsService).to(ToastsService);
appContainer.bind<ISoundsService>(TYPES.SoundsService).to(SoundsService);
appContainer.bind<IAuthService>(TYPES.AuthService).to(AuthService);
appContainer.bind<IAppSettingsService>(TYPES.AppSettingsService).to(AppSettingsService);
appContainer.bind<ILogsService>(TYPES.LogsService).to(LogsService);
appContainer
  .bind<interfaces.Factory<IGameController>>(TYPES.GameController)
  .toFactory<IGameController>(({ container }) => () =>
    new GameController(
      container.get(TYPES.SignalRClient),
      container.get<ISiApiClient>(TYPES.SiApiClient),
      container.get<IToastsService>(TYPES.ToastsService),
      container.get<i18n>(TYPES.Translation),
      container.get<ISoundsService>(TYPES.SoundsService),
      container.get<ILogsService>(TYPES.LogsService),
      container.get<IAuthService>(TYPES.AuthService),
      container.get<IGamesService>(TYPES.GamesService).packagePublicUrl$.getValue(),
    ),
  );

appContainer.get<IAppSettingsService>(TYPES.AppSettingsService).initSettings();
const logsService = appContainer.get<ILogsService>(TYPES.LogsService);

export { appContainer, InversifyContext, logsService };
