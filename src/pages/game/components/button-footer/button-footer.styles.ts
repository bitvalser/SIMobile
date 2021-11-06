import styled from 'styled-components/native';

export const TryButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.pallette.danger};
  border: 1px solid ${({ theme }) => theme.pallette.primary};
  height: 50px;
  width: 100%;
`;

export const Container = styled.View`
  display: flex;
  width: 100%;
  flex-direction: row;
`;
