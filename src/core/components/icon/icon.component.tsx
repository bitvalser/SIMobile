import React, { FC } from 'react';
import { APP_ICONS } from './icon.data';
import * as Styled from './icon.styles';
import { AppIconProps } from './icon.types';

const AppIcon: FC<AppIconProps> = React.memo(({ name, color = 'black', size = 28 }) => (
  <Styled.Icon color={color} size={size} source={APP_ICONS[name]} />
));

export default AppIcon;
