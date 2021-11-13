import { getBorderColor } from '@pages/game/components/player-avatar/player-avatar.data';
import { AvatarState } from '@pages/game/components/player-avatar/player-avatar.types';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

export const Container = styled.View<{ hide: boolean }>`
  display: flex;
  flex-direction: row;
  margin-bottom: 12px;
  max-height: 100px;
  height: 100px;
  opacity: ${({ hide }) => (hide ? 0.5 : 1)};
  min-height: 100px;
  position: relative;
`;

export const AvatarContainer = styled.View`
  border: 2px solid ${({ theme }) => getBorderColor(AvatarState.Default, theme)};
  width: 100px;
  height: 100px;
`;

export const UserText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.pallette.primary};
`;

export const InfoContainer = styled.View`
  display: flex;
  flex-direction: column;
  margin-left: 16px;
  flex: 1;
`;

export const TextContainer = styled(LinearGradient).attrs({
  colors: ['#222223', '#11121a', '#222223'],
  angle: 180,
})<{ isLast?: boolean }>`
  flex: 1;
  margin-bottom: ${({ isLast = false }) => (isLast ? 0 : 4)}px;
  display: flex;
  padding: 4px 0;
  justify-content: center;
  align-items: center;
`;
