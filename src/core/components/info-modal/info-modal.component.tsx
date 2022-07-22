import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog } from '@core/components/dialog';
import { createModalHook } from '@core/helpers/create-modal-hook.helper';
import { AppButton } from '../button';
import * as Styled from './info-modal.styles';
import { InfoModalProps } from './info-modal.types';

const InfoModal: FC<InfoModalProps> = ({ text, title, close, onConfirm = () => null }) => {
  const [t] = useTranslation();

  const handleConfirm = () => {
    close();
    onConfirm();
  };

  return (
    <Dialog onClose={close} title={title}>
      <Styled.Content>
        <Styled.InfoText>{text}</Styled.InfoText>
      </Styled.Content>
      <AppButton text={t('confirm')} fullWidth onPress={handleConfirm} />
    </Dialog>
  );
};

const useInfoModal = createModalHook<InfoModalProps>((props) => () => <InfoModal {...props} />);

export default useInfoModal;
