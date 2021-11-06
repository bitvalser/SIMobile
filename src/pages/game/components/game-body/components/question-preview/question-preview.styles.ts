import { RotateContainer } from '@core/components/rotate-container';
import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const PreviewText = styled.Text`
  font-size: 72px;
  line-height: 100px;
  text-transform: uppercase;
  display: flex;
  color: ${({ theme }) => theme.pallette.primary};
`;

export const Rotate = styled(RotateContainer)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;
