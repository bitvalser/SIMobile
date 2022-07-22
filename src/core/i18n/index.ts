import i18n from 'i18next';
import { Platform, NativeModules } from 'react-native';
import { StorageKeys } from '@core/constants/storage-keys.constants';
import { storage } from '../../inversify.config';
import { AppLanguages } from '../constants/languages.constants';
import ru from './locales/ru.json';

const resources = {
  [AppLanguages.Ru]: {
    translations: ru,
  },
};

const locale =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0]
    : NativeModules.I18nManager.localeIdentifier;

export const systemLanguage =
  locale && Object.values(AppLanguages).includes(locale.substring(0, 2))
    ? (locale as string).substring(0, 2)
    : AppLanguages.Ru;

export const initLanguage = async () => {
  console.log(storage);
  let language = storage.getString(StorageKeys.Language);
  if (!language) {
    language = systemLanguage;
  }
  i18n.init({
    lng: language,
    fallbackLng: AppLanguages.Ru,
    resources,
    fallbackNS: ['translations'],
    defaultNS: 'translations',
    whitelist: [AppLanguages.Ru],
  });
};

export default i18n;
