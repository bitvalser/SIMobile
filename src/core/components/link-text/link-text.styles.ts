import styled from 'styled-components/native';

export const LinkText = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.pallette.highlight};
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-color: ${({ theme }) => theme.pallette.highlight};
`;
