import styled from 'styled-components/native';

export const Content = styled.ScrollView`
  flex-direction: column;
  padding: 12px;
  flex: 1;
`;

export const InfoText = styled.Text`
  font-size: 16px;
  line-height: 22px;
  margin-bottom: 24px;
  color: ${({ theme }) => theme.pallette.black};
`;
