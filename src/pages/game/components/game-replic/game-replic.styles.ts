import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const ReplicText = styled.Text`
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  margin: 12px 0;
  text-shadow-color: #000;
  text-shadow-offset: 0px 1px;
  text-shadow-radius: 5px;
  color: ${({ theme }) => theme.pallette.primary};
`;
