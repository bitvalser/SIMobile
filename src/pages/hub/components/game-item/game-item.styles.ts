import styled from 'styled-components/native';

export const Container = styled.View`
  background: ${({ theme }) => theme.pallette.thirdBackground};
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  margin: 8px 12px;
  elevation: 5;
  border-radius: 20px;
`;

export const Footer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const Status = styled.Text`
  font-size: 16px;
`;

export const DateText = styled.Text`
  font-size: 16px;
`;

export const Spacer = styled.View`
  display: flex;
  flex: 1;
`;

export const GameIconContainer = styled.View`
  margin-right: 4px;
`;

export const PlayersContainer = styled.View`
  background: ${({ theme }) => theme.pallette.gray};
  padding: 2px;
  align-items: center;
  padding-left: 4px;
  padding-right: 4px;
  border-radius: 4px;
  flex-direction: row;
`;

export const PlayersText = styled.Text`
  font-size: 16px;
`;
