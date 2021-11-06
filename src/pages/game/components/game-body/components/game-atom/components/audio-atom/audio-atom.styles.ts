import { RotateContainer } from '@core/components/rotate-container';
import styled from 'styled-components/native';

export const NoteText = styled.Text`
  font-size: 72px;
  line-height: 144px;
  display: flex;
  color: ${({ theme }) => theme.pallette.primary};
`;

export const Container = styled(RotateContainer)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;
