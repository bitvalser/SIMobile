import React from 'react';
import { useTranslation } from 'react-i18next';
import { AppButton } from '@core/components/button';
import { BackgroundContainer } from '@core/components/background-container';
import { useNavigation } from '@react-navigation/core';
import * as Styled from './main-menu.styles';
import { AppRoutes } from '@navigators/root';
import { useAboutModal } from './components/about-modal';
import { useService } from '@core/hooks/use-service.hook';
import { GamesService } from '@core/services/games/games-service.service';
import useSubscription from '@core/hooks/use-subscription.hook';
import useInfoModal from '@core/components/info-modal/info-modal.component';

const MainMenu = () => {
  const [t] = useTranslation();
  const { hostInfo$ } = useService(GamesService);
  const navigation = useNavigation();
  const [showAbout] = useAboutModal();
  const [showLicenseInfo] = useInfoModal();
  const hostInfo = useSubscription(hostInfo$);

  const handleEnterHub = () => {
    navigation.navigate(AppRoutes.Hub);
  };

  const handleSettings = () => {
    navigation.navigate(AppRoutes.Settings);
  };

  const handleLicense = () => {
    showLicenseInfo({
      title: t('about.serverLicense'),
      text: hostInfo.license,
    });
  };

  return (
    <BackgroundContainer>
      <Styled.Content>
        <AppButton onPress={handleEnterHub} text={t('hub.enterHub')} />
        <AppButton onPress={handleSettings} text={t('settings.title')} />
        <AppButton onPress={showAbout} text={t('about.title')} />
        {hostInfo ? <AppButton onPress={handleLicense} text={t('about.serverLicense')} /> : null}
      </Styled.Content>
      {hostInfo ? <Styled.ServerTitle>{t('auth.serverName') + hostInfo.name}</Styled.ServerTitle> : null}
    </BackgroundContainer>
  );
};

export default MainMenu;
