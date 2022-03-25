import i18n from 'i18next';
import ru from './locales/ru.json';
import { Platform, NativeModules } from 'react-native';
// TODO: use mmkv package for storage
import AsyncStorage from '@react-native-community/async-storage';
import { AsyncStorageKeys } from '../constants/async-storage.constants';
import { AppLanguages } from '../constants/languages.constants';

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
  locale && Object.values(AppLanguages).includes(locale.substr(0, 2))
    ? (locale as string).substr(0, 2)
    : AppLanguages.Ru;

const initLanguage = async () => {
  let language = await AsyncStorage.getItem(AsyncStorageKeys.Language);
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

initLanguage();

export default i18n;
