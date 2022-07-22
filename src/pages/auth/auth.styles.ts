import styled from 'styled-components/native';
import { AppText } from '@core/components/text';

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

export const Title = styled(AppText)`
  color: ${({ theme }) => theme.pallette.primary};
  font-size: 20px;
  text-align: center;
`;

export const NoUsers = styled.Text`
  color: ${({ theme }) => theme.pallette.black};
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: 20px;
  text-align: center;
  width: 100%;
`;

export const UserItem = styled.View`
  padding: 8px;
  display: flex;
  align-items: center;
  flex-direction: row;
`;

export const UserAvatar = styled.Image`
  width: 69px;
  height: 69px;
  margin-right: 8px;
`;

export const UserName = styled(AppText)`
  color: ${({ theme }) => theme.pallette.primary};
  font-size: 28px;
  text-align: center;
`;

export const Spacer = styled.View`
  display: flex;
  flex: 1;
`;

export const DeleteUser = styled.TouchableOpacity`
  padding: 8px;
`;
