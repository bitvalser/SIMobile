import styled from 'styled-components/native';
import { AppText } from '@core/components/text';

export const Container = styled.View<{ selected: boolean }>`
  padding: 4px 16px;
  border-radius: 4px;
  border: 1px solid ${({ theme, selected }) => (selected ? theme.pallette.primary : theme.pallette.secondary)};
`;

export const ChipText = styled(AppText)<{ selected: boolean }>`
  font-size: 18px;
  color: ${({ theme, selected }) => (selected ? theme.pallette.primary : theme.pallette.secondary)};
`;
