import styled from 'styled-components/native';

export const Content = styled.View`
  padding: 12px;
  display: flex;
  flex-direction: column;
`;

export const Footer = styled.View`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.TextInput`
  margin-top: 12px;
  height: 40px;
  flex: 1;
  background: ${({ theme }) => theme.pallette.white};
  border: 1px solid ${({ theme }) => theme.pallette.black};
`;

export const UserContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  margin-right: 8px;
`;
