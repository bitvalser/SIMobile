import React, { FC } from 'react';
import * as Styled from './background-container.styles';

const BackgroundContainer: FC = ({ children }) => {
  return <Styled.Container>{children}</Styled.Container>;
};

export default BackgroundContainer;
