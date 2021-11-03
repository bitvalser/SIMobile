import React, { FC } from 'react';
import { DialogProps } from './dialog.types';
import * as Styled from './dialog.styles';
import i18n from '@core/i18n';
import { TouchableOpacity } from 'react-native';

const Dialog: FC<DialogProps> = ({
  children,
  title = i18n.t('dialog'),
  onClose,
}) => {
  return (
    <Styled.Container>
      <Styled.ModalContainer>
        <Styled.Header>
          <Styled.Title numberOfLines={1}>{title}</Styled.Title>
          <TouchableOpacity>
            <Styled.CloseText onPress={onClose}>✕</Styled.CloseText>
          </TouchableOpacity>
        </Styled.Header>
        <Styled.Content>{children}</Styled.Content>
      </Styled.ModalContainer>
    </Styled.Container>
  );
};

export default Dialog;
