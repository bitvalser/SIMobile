import styled from 'styled-components/native';

export const Container = styled.View<{ selected: boolean }>`
  padding: 4px 16px;
  border-radius: 4px;
  border: 1px solid ${({ theme, selected }) => (selected ? theme.pallette.primary : theme.pallette.secondary)};
`;

export const ChipText = styled.Text<{ selected: boolean }>`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme, selected }) => (selected ? theme.pallette.primary : theme.pallette.secondary)};
`;
