import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import { useTheme } from 'styled-components';
import { BackgroundContainer } from '@core/components/background-container';
import { useService } from '@core/hooks/use-service.hook';
import { AppSettingsService } from '@core/services/settings/settings.service';
import CheckBox from '@react-native-community/checkbox';
import * as Styled from './settings.styles';

const TOAST_POSITIONS_DATA: RadioButtonProps[] = [
  {
    id: '1',
    label: 'settings.toastPositionBottom',
    value: 'bottom',
  },
  {
    id: '2',
    label: 'settings.toastPositionTop',
    value: 'top',
  },
];

const Settings: FC = () => {
  const [t] = useTranslation();
  const theme = useTheme();
  const { getSetting, saveSetting, updateSetting } = useService(AppSettingsService);
  const [sound, setSound] = useState<number>(() => getSetting('soundValue'));
  const [toastPosition, setToastPosition] = useState<string>(() => getSetting('gameToastsPosition'));
  const [preload, setPreload] = useState<boolean>(() => getSetting('preloadResources'));

  useEffect(
    () => () => {
      updateSetting({
        soundValue: sound,
        gameToastsPosition: toastPosition as 'top' | 'bottom',
        preloadResources: preload,
      });
    },
    [sound, toastPosition, preload, updateSetting],
  );

  useEffect(() => {
    saveSetting();
  }, [saveSetting]);

  const handleChange = (value: number[] | number) => {
    setSound(value[0]);
  };

  const handleToastChange = (buttons: RadioButtonProps[]) => {
    setToastPosition(buttons.find((item) => item.selected).value);
  };

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
            onValueChange={handleChange}
          />
          <Styled.SettingsValue>{sound}</Styled.SettingsValue>
        </Styled.RowContainer>
        <Styled.RowHorizontalContainer>
          <Styled.SettingsName>{t('settings.toastPosition')}</Styled.SettingsName>
          <RadioGroup
            radioButtons={TOAST_POSITIONS_DATA.map((item) => ({
              ...item,
              label: t(item.label),
              selected: item.value === toastPosition,
              labelStyle: {
                fontSize: 24,
                color: theme.pallette.primary,
                fontFamily: theme.fonts.primary,
              },
            }))}
            layout="row"
            onPress={handleToastChange}
          />
        </Styled.RowHorizontalContainer>
        <Styled.RowContainer>
          <CheckBox value={preload} onValueChange={setPreload} />
          <Styled.SettingsName>{t('settings.preloadResources')}</Styled.SettingsName>
        </Styled.RowContainer>
      </Styled.Container>
    </BackgroundContainer>
  );
};

export default Settings;
