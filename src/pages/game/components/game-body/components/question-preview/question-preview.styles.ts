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
  font-size: 62px;
  line-height: 80px;
  text-transform: uppercase;
  text-align: center;
  display: flex;
  text-shadow-color: #000;
  text-shadow-offset: 0px 1px;
  text-shadow-radius: 5px;
  color: ${({ theme }) => theme.pallette.primary};
`;

export const Rotate = styled(RotateContainer)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;
