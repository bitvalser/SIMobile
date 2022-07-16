import { BehaviorSubject } from 'rxjs';

export interface AppSettings {
  soundValue: number;
  gameToastsPosition: 'top' | 'bottom';
  preloadResources: boolean;
}

export interface IAppSettingsService {
  settings$: BehaviorSubject<AppSettings>;
  initSettings(): void;
  getSetting<K extends keyof AppSettings>(key: K): AppSettings[K];
  saveSetting(): void;
  updateSetting<K extends keyof AppSettings>(
    settings: {
      [key in K]?: AppSettings[K];
    },
  ): void;
}
