import { BehaviorSubject } from 'rxjs';

export interface AppSettings {
  soundValue: number;
}

export interface IAppSettingsService {
  settings$: BehaviorSubject<AppSettings>;
  initSettings(): void;
  getSetting(key: keyof AppSettings): AppSettings[keyof AppSettings];
  saveSetting(): void;
  updateSetting(
    settings: {
      [key in keyof AppSettings]?: AppSettings[keyof AppSettings];
    },
  ): void;
}
