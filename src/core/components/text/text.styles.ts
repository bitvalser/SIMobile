import styled from 'styled-components/native';

export const TextContainer = styled.Text<{ shadow: boolean }>`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 18px;
  text-shadow-color: #000;
  text-shadow-offset: 0px 1px;
  text-shadow-radius: ${({ shadow }) => (shadow ? 5 : 0)}px;
`;
