import styled from 'styled-components/native';

export const ModalContainer = styled.View`
  width: 400px;
  min-height: 80%;
  background: ${({ theme }) => theme.pallette.background};
`;

export const ModalContent = styled.View`
  display: flex;
  flex: 1;
  padding: 12px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.pallette.primary};
  font-weight: bold;
  font-size: 20px;
  text-align: center;
`;

export const YourNameText = styled.Text`
  margin-top: 12px;
`;

export const Input = styled.TextInput`
  margin-top: 12px;
  height: 40px;
  background: ${({ theme }) => theme.pallette.white};
  border: 1px solid ${({ theme }) => theme.pallette.black};
`;
