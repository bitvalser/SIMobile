import { inject, injectable } from 'inversify';
import { BehaviorSubject } from 'rxjs';
import MMKVStorage from 'react-native-mmkv-storage';
import { TYPES } from '../types';
import { IAppSettingsService, AppSettings } from './settings.types';
import { StorageKeys } from '@core/constants/storage-keys.constants';

const DEFAULT_SETTINGS: AppSettings = {
  soundValue: 100,
};

@injectable()
export class AppSettingsService implements IAppSettingsService {
  public static type = TYPES.AppSettingsService;
  @inject(TYPES.Storage)
  private storageApi: MMKVStorage.API;
  public settings$: BehaviorSubject<AppSettings> = new BehaviorSubject<AppSettings>(DEFAULT_SETTINGS);

  public constructor() {
    this.getSetting = this.getSetting.bind(this);
    this.updateSetting = this.updateSetting.bind(this);
    this.saveSetting = this.saveSetting.bind(this);
  }

  public initSettings(): void {
    const settings = this.storageApi.getMap<AppSettings>(StorageKeys.AppSettings);
    if (!settings) {
      this.storageApi.setMap(StorageKeys.AppSettings, DEFAULT_SETTINGS);
    } else {
      this.settings$.next(settings);
    }
  }

  public getSetting<K extends keyof AppSettings>(key: K): AppSettings[K] {
    return this.settings$.getValue()[key];
  }

  public updateSetting(
    settings: {
      [key in keyof AppSettings]?: AppSettings[keyof AppSettings];
    },
  ): void {
    this.settings$.next({
      ...this.settings$.getValue(),
      ...settings,
    });
  }

  public saveSetting(): void {
    this.storageApi.setMap(StorageKeys.AppSettings, this.settings$.getValue());
  }
}
