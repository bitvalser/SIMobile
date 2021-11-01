import React, { FC } from 'react';
import backgroundImage from '@assets/images/background.png';
import * as Styled from './background-container.styles';

const BackgroundContainer: FC = ({ children }) => {
  return (
    <Styled.Container source={backgroundImage} resizeMode="cover">
      {children}
    </Styled.Container>
  );
};

export default BackgroundContainer;
