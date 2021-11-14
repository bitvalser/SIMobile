import 'react-native-gesture-handler';
import React, { Suspense } from 'react';
import { RootNavigator } from './navigators/root';
import i18n from './core/i18n';
import { I18nextProvider } from 'react-i18next';
import { UIManager, Platform, StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { defaultTheme } from './theme';
import { appContainer, InversifyContext } from './inversify.config';
import { ModalsContainer } from '@core/components/modals-container';
import { ToastsContainer } from '@core/components/toasts-container';
import { ErrorBoundary } from '@core/components/error-boundary';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

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
