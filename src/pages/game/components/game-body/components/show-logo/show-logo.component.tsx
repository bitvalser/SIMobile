import React, { FC } from 'react';
import logoImage from '@assets/images/logo.png';
import * as Styled from './show-logo.styles';

const ShowLogo: FC = () => {
  return (
    <Styled.Container>
      <Styled.LogoImage resizeMode="contain" source={logoImage} />
    </Styled.Container>
  );
};

export default ShowLogo;
