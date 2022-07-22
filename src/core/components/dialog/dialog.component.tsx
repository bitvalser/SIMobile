import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import i18n from '@core/i18n';
import * as Styled from './dialog.styles';
import { DialogProps } from './dialog.types';

const Dialog: FC<DialogProps> = ({ children, title = i18n.t('dialog'), onClose = null }) => {
  return (
    <Styled.Container>
      <Styled.ModalContainer>
        <Styled.Header>
          <Styled.Title numberOfLines={1}>{title}</Styled.Title>
          {onClose && (
            <TouchableOpacity onPress={onClose}>
              <Styled.CloseText>✕</Styled.CloseText>
            </TouchableOpacity>
          )}
        </Styled.Header>
        <Styled.Content>{children}</Styled.Content>
      </Styled.ModalContainer>
    </Styled.Container>
  );
};

export default Dialog;
