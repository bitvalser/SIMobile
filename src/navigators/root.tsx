import React from 'react';
import { navigationRef } from '@core/services/navigation.service';
import { Auth as AuthPage } from '@pages/auth';
import { Game as GamePage } from '@pages/game';
import { GameParamList } from '@pages/game/game.types';
import { Hub as HubPage } from '@pages/hub';
import { MainMenu as MainMenuPage } from '@pages/main-menu';
import { Settings as SettingsPage } from '@pages/settings';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export enum AppRoutes {
  MainMenu = 'MainMenu',
  Auth = 'Auth',
  Hub = 'Hub',
  Game = 'Game',
  Settings = 'Settings',
}

export type AppRoutesParamList = {
  [AppRoutes.Game]: GameParamList;
  [AppRoutes.Auth]: {};
  [AppRoutes.Hub]: {};
  [AppRoutes.MainMenu]: {};
  [AppRoutes.Settings]: {};
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
        <RootStack.Screen name={AppRoutes.Settings} component={SettingsPage} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
