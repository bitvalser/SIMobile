import styled from 'styled-components/native';
import { RotateContainer } from '@core/components/rotate-container';

export const NoteText = styled.Text`
  font-size: 72px;
  line-height: 172px;
  display: flex;
  font-family: ${({ theme }) => theme.fonts.secondary};
  color: ${({ theme }) => theme.pallette.primary};
`;

export const Container = styled(RotateContainer)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;
