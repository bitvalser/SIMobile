import styled from 'styled-components/native';

export const Content = styled.View`
  flex-direction: column;
  margin: 12px;
`;

export const AboutText = styled.Text`
  font-size: 16px;
  line-height: 22px;
  color: ${({ theme }) => theme.pallette.black};
`;

export const BoldText = styled(AboutText)`
  font-weight: bold;
`;
