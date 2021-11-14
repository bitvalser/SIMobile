import React, { FC } from 'react';
import * as Styled from './text.styles';
import { AppTextProps } from './text.types';

const AppText: FC<AppTextProps> = ({ children, shadow = true, ...props }) => {
  return (
    <Styled.TextContainer shadow={shadow} {...props}>
      {children}
    </Styled.TextContainer>
  );
};

export default AppText;
