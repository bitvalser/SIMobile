import React, { FC } from 'react';
import { TouchableHighlight, TouchableHighlightProps, ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components/native';
import * as Styled from './button.styles';

const AppButton: FC<
  TouchableHighlightProps & {
    text: string;
    fullWidth?: boolean;
    loading?: boolean;
  }
> = ({ text, fullWidth = false, disabled = false, loading = false, ...props }) => {
  const { pallette } = useTheme();

  return (
    <Styled.Container disabled={disabled} fullWidth={fullWidth}>
      <TouchableHighlight disabled={disabled || loading} {...props} underlayColor={pallette.highlight}>
        <Styled.Content>
          {!loading ? <Styled.ButtonText>{text}</Styled.ButtonText> : <ActivityIndicator color={pallette.primary} />}
        </Styled.Content>
      </TouchableHighlight>
    </Styled.Container>
  );
};

export default AppButton;
