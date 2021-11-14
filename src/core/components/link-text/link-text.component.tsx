import React, { FC } from 'react';
import { Linking, TouchableOpacity } from 'react-native';
import * as Styled from './link-text.styles';

const LinkText: FC<{ link: string }> = ({ children, link }) => {
  const handleClick = () => {
    Linking.openURL(link);
  };

  return (
    <TouchableOpacity onPress={handleClick}>
      <Styled.LinkText>{children}</Styled.LinkText>
    </TouchableOpacity>
  );
};

export default LinkText;
