import styled from "styled-components/native";

export const RoomItem = styled.Pressable`
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.app.app3};
  padding-bottom: ${({ theme }) => theme.spacing.m}px;
  border-bottom-width: 2px;
  border-bottom-color: ${({ theme }) => theme.colors.ui.ui5};
  margin-top: ${({ theme }) => theme.spacing.m}px;
`;

export const LeftContainer = styled.View`
  flex: 1;
  flex-direction: row;
`;

export const UserName = styled.Text`
  font-family: ${({ theme }) => theme.typography.family.semi_bold};
  font-size: ${({ theme }) => theme.typography.size.m}px;
  color: ${({ theme }) => theme.colors.app.app1};
  line-height: ${({ theme }) => theme.spacing.md}px;
`;

export const MessageText = styled.Text<{ typing?: string | null }>`
  font-family: ${({ theme }) => theme.typography.family.medium};
  font-size: ${({ theme }) => theme.typography.size.sm}px;
  color: ${({ theme, typing }) =>
    typing ? theme.colors.ui.ui8 : theme.colors.app.app2};
  line-height: 18px;
  margin-top: 1px;
`;

export const RightContainer = styled.View`
  align-items: flex-end;
`;

export const MessageTime = styled.Text`
  font-family: ${({ theme }) => theme.typography.family.semi_bold};
  font-size: ${({ theme }) => theme.typography.size.s}px;
  color: ${({ theme }) => theme.colors.ui.ui3};
  line-height: ${({ theme }) => theme.spacing.m}px;
  margin-bottom: ${({ theme }) => theme.spacing.s}px;
`;

export const UnreadBadge = styled.View`
  width: 16px;
  height: 16px;
  border-radius: 30px;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.brand.brand4};
  align-items: center;
  justify-content: center;
`;

export const MessageCount = styled.Text`
  font-family: ${({ theme }) => theme.typography.family.bold};
  font-size: ${({ theme }) => theme.typography.size.s}px;
  color: ${({ theme }) => theme.colors.brand.brand1};
  line-height: ${({ theme }) => theme.spacing.m}px;
  position: absolute;
`;
