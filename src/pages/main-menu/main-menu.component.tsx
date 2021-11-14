import React from 'react';
import { useTranslation } from 'react-i18next';
import { AppButton } from '@core/components/button';
import { BackgroundContainer } from '@core/components/background-container';
import { useNavigation } from '@react-navigation/core';
import * as Styled from './main-menu.styles';
import { AppRoutes } from '@navigators/root';
import { useAboutModal } from './components/about-modal';

const MainMenu = () => {
  const [t] = useTranslation();
  const navigation = useNavigation();
  const [showAbout] = useAboutModal();

  const handleEnterHub = () => {
    navigation.navigate(AppRoutes.Hub);
  };

  const handleSettings = () => {
    navigation.navigate(AppRoutes.Settings);
  };

  return (
    <BackgroundContainer>
      <Styled.Content>
        <AppButton onPress={handleEnterHub} text={t('hub.enterHub')} />
        <AppButton onPress={handleSettings} text={t('settings.title')} />
        <AppButton onPress={showAbout} text={t('about.title')} />
      </Styled.Content>
    </BackgroundContainer>
  );
};

export default MainMenu;
