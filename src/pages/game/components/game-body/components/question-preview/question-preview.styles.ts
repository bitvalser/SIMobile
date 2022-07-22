import styled from 'styled-components/native';
import { RotateContainer } from '@core/components/rotate-container';
import { AppText } from '@core/components/text';

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const PreviewText = styled(AppText)`
  font-size: 62px;
  line-height: 80px;
  text-transform: uppercase;
  text-align: center;
  display: flex;
  color: ${({ theme }) => theme.pallette.primary};
`;

export const Rotate = styled(RotateContainer)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;
