import styled from "styled-components/native";

interface AvatarProps {
  width: number;
  height: number;
}

export const Container = styled.View`
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.s}px;
  margin-right: ${({ theme }) => theme.spacing.m}px;
`;

export const AvatarContainer = styled.TouchableOpacity`
  position: relative;
`;

export const UserAvatar = styled.Image<AvatarProps>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.colors.app.app3};
`;

export const OnlineIndicator = styled.View`
  position: absolute;
  width: 14px;
  height: 14px;
  bottom: -${({ theme }) => theme.spacing.xs}px;
  right: ${({ theme }) => theme.spacing.xs}px;
  border-radius: 7px;
  border-width: 1.5px;
  border-color: ${({ theme }) => theme.colors.app.app3};
  background-color: ${({ theme }) => theme.colors.ui.ui7};
`;

export const UserName = styled.Text<{ online: boolean }>`
  font-family: ${({ theme }) => theme.typography.family.semi_bold};
  font-size: ${({ theme }) => theme.typography.size.sm}px;
  color: ${({ theme, online }) =>
    online ? theme.colors.app.app1 : theme.colors.ui.ui3};
  line-height: 18px;
`;
