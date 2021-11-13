import React, { FC } from 'react';
import * as Styled from './show-logo.styles';
import logoImage from '@assets/images/logo.png';

const ShowLogo: FC = () => {
  return (
    <Styled.Container>
      <Styled.LogoImage resizeMode="contain" source={logoImage} />
    </Styled.Container>
  );
};

export default ShowLogo;
