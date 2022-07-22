import React, { FC } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Dialog } from '@core/components/dialog';
import { LinkText } from '@core/components/link-text';
import { createModalHook } from '@core/helpers/create-modal-hook.helper';
import { ModalOptions } from '@core/services/modals/modals.types';
import * as Styled from './about-modal.styles';

const ORIGINAL_LINK = 'http://vladimirkhil.com/';
const VK_LINK = 'https://vk.com/valerabitkovsky';

const AboutModal: FC<ModalOptions> = ({ close }) => {
  const [t] = useTranslation();

  return (
    <Dialog onClose={close} title={t('about.title')}>
      <Styled.Content>
        <Styled.AboutText>
          <Trans
            i18nKey="about.text"
            values={{ original_url: ORIGINAL_LINK, vk_url: VK_LINK }}
            tOptions={{
              interpolation: {
                escapeValue: false,
              },
            }}
            components={{
              originalLink: <LinkText link={ORIGINAL_LINK} />,
              vkLink: <LinkText link={VK_LINK} />,
              bold: <Styled.BoldText />,
            }}
          />
        </Styled.AboutText>
      </Styled.Content>
    </Dialog>
  );
};

const useAboutModal = createModalHook<ModalOptions>((props) => () => <AboutModal {...props} />);

export default useAboutModal;
