import React from 'react';
import { useTranslation } from 'react-i18next';
import { AppButton } from '@core/components/button';
import { BackgroundContainer } from '@core/components/background-container';
import { useNavigation } from '@react-navigation/core';
import * as Styled from './main-menu.styles';
import { AppRoutes } from '@navigators/root';

const MainMenu = () => {
  const [t] = useTranslation();
  const navigation = useNavigation();

  const handleEnterHub = () => {
    navigation.navigate(AppRoutes.Hub);
  };

  return (
    <BackgroundContainer>
      <Styled.Content>
        <AppButton onPress={handleEnterHub} text={t('hub.enterHub')} />
      </Styled.Content>
    </BackgroundContainer>
  );
};

export default MainMenu;
