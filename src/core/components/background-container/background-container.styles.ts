import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
  background-color: ${({ theme }) => theme.pallette.secondaryBackground};
`;
