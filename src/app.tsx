import React, { Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';
import { UIManager, Platform, StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import 'reflect-metadata';
import { ThemeProvider } from 'styled-components/native';
import { ErrorBoundary } from '@core/components/error-boundary';
import { ModalsContainer } from '@core/components/modals-container';
import { ToastsContainer } from '@core/components/toasts-container';
import i18n, { initLanguage } from './core/i18n';
import { appContainer, InversifyContext } from './inversify.config';
import { RootNavigator } from './navigators/root';
import { defaultTheme } from './theme';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

initLanguage();

const App = (): JSX.Element => (
  <>
    <StatusBar hidden />
    <InversifyContext.Provider value={appContainer}>
      <ThemeProvider theme={defaultTheme}>
        <I18nextProvider i18n={i18n}>
          <Suspense fallback={null}>
            <ErrorBoundary>
              <RootNavigator />
              <ToastsContainer />
              <ModalsContainer />
            </ErrorBoundary>
          </Suspense>
        </I18nextProvider>
      </ThemeProvider>
    </InversifyContext.Provider>
  </>
);

export default App;
