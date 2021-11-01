import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from '@core/services/navigation.service';

import { MainMenu as MainMenuPage } from '@pages/main-menu';
import { Auth as AuthPage } from '@pages/auth';
import { Hub as HubPage } from '@pages/hub';

export enum AppRoutes {
  MainMenu = 'MainMenu',
  Auth = 'Auth',
  Hub = 'Hub',
}

const RootStack = createStackNavigator();

export const RootNavigator = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name={AppRoutes.Auth} component={AuthPage} />
        <RootStack.Screen name={AppRoutes.Hub} component={HubPage} />
        <RootStack.Screen name={AppRoutes.MainMenu} component={MainMenuPage} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
