import styled from 'styled-components/native';

export const BUTTON_HEIGHT = 50;

export const TryButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.pallette.danger};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  border: 1px solid ${({ theme }) => theme.pallette.primary};
  height: ${BUTTON_HEIGHT}px;
  width: 100%;
  elevation: 7;
`;

export const Container = styled.View`
  display: flex;
  width: 100%;
  flex-direction: row;
`;
