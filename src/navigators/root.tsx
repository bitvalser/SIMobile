import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from '@core/services/navigation.service';

import { MainMenu as MainMenuPage } from '@pages/main-menu';
import { Auth as AuthPage } from '@pages/auth';
import { Hub as HubPage } from '@pages/hub';
import { Game as GamePage } from '@pages/game';
import { GameParamList } from '@pages/game/game.types';

export enum AppRoutes {
  MainMenu = 'MainMenu',
  Auth = 'Auth',
  Hub = 'Hub',
  Game = 'Game',
}

export type AppRoutesParamList = {
  [AppRoutes.Game]: GameParamList;
  [AppRoutes.Auth]: {};
  [AppRoutes.Hub]: {};
  [AppRoutes.MainMenu]: {};
};

const RootStack = createStackNavigator<AppRoutesParamList>();

export const RootNavigator = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name={AppRoutes.Auth} component={AuthPage} />
        <RootStack.Screen name={AppRoutes.Hub} component={HubPage} />
        <RootStack.Screen name={AppRoutes.Game} component={GamePage} />
        <RootStack.Screen name={AppRoutes.MainMenu} component={MainMenuPage} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
