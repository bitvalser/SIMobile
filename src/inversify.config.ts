import { createContext } from 'react';
import { appConfig } from '@core/config/config';
import translation from '@core/i18n';
import { i18n } from 'i18next';
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

const InversifyContext = createContext<interfaces.Container>(null);

const appContainer = new Container({ defaultScope: 'Singleton' });
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

export { appContainer, InversifyContext };
