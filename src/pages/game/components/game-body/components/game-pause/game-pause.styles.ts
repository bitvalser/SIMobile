import styled from 'styled-components/native';
import { AppText } from '@core/components/text';

export const Container = styled.View`
  display: flex;
  position: absolute;
  top: 0;
  align-items: center;
  justify-content: center;
  z-index: 12;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
`;

export const PauseText = styled(AppText)`
  font-size: 64px;
  color: ${({ theme }) => theme.pallette.primary};
`;
