import styled from 'styled-components/native';
import { AppIconProps } from './icon.types';

export const Icon = styled.Image<{
  color: AppIconProps['color'];
  size: number;
}>`
  tint-color: ${({ theme, color }) => theme.pallette[color]};
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`;
