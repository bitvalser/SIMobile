import React, { FC, useEffect, useState } from 'react';
import * as Styled from './settings.styles';
import { useTranslation } from 'react-i18next';
import { useService } from '@core/hooks/use-service.hook';
import { AppSettingsService } from '@core/services/settings/settings.service';
import { BackgroundContainer } from '@core/components/background-container';

const Settings: FC = () => {
  const [t] = useTranslation();
  const { getSetting, saveSetting, updateSetting } = useService(AppSettingsService);
  const [sound, setSound] = useState<number>(() => getSetting('soundValue'));

  useEffect(
    () => () => {
      updateSetting({
        soundValue: sound,
      });
      saveSetting();
    },
    [saveSetting, sound, updateSetting],
  );

  return (
    <BackgroundContainer>
      <Styled.Container>
        <Styled.Title>{t('settings.title')}</Styled.Title>
        <Styled.RowContainer>
          <Styled.SettingsName>{t('settings.sound')}</Styled.SettingsName>
          <Styled.SettingsSlider
            minimumValue={0}
            maximumValue={100}
            step={1}
            animationType="timing"
            value={sound}
            onValueChange={setSound as (value: number | Array<number>) => void}
          />
          <Styled.SettingsValue>{sound}</Styled.SettingsValue>
        </Styled.RowContainer>
      </Styled.Container>
    </BackgroundContainer>
  );
};

export default Settings;
