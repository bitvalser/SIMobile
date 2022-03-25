import React, { FC } from 'react';
import { Dialog } from '@core/components/dialog';
import { createModalHook } from '@core/helpers/create-modal-hook.helper';
import { ModalOptions } from '@core/services/modals/modals.types';
import * as Styled from './create-account-modal.styles';
import { useTranslation } from 'react-i18next';

const CreateAccountModal: FC<ModalOptions> = ({ close }) => {
  const [t] = useTranslation();

  return (
    <Dialog onClose={close} title={t('about.title')}>
      <Styled.Content></Styled.Content>
    </Dialog>
  );
};

const useCreateAccountModal = createModalHook<ModalOptions>((props) => () => <CreateAccountModal {...props} />);

export default useCreateAccountModal;
