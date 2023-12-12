import { styled } from "styled-components/native";

export const Backdrop = styled.Pressable`
  flex: 1;
`;

export const Container = styled.View`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md * 2}px;
  right: ${({ theme }) => theme.spacing.s}px;
  padding-horizontal: ${({ theme }) => theme.spacing.s}px;
  padding-top: ${({ theme }) => theme.spacing.s}px;
  border-radius: ${({ theme }) => theme.spacing.s}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.ui.ui3};
  background-color: ${({ theme }) => theme.colors.app.app3};
  elevation: 5;
  ${"" /* TODO: Add shadow for IOS */}
`;

export const ButtonCard = styled.Pressable`
  flex-direction: row;
  margin-bottom: ${({ theme }) => theme.spacing.s}px;
  align-items: center;
`;

export const Title = styled.Text<{ hasIcon: boolean }>`
  font-family: ${({ theme }) => theme.typography.family.semi_bold};
  font-size: ${({ theme }) => theme.typography.size.m}px;
  color: ${({ theme }) => theme.colors.app.app1};
  margin-left: ${({ theme, hasIcon }) =>
    hasIcon ? `${theme.spacing.s}px` : "0"};
`;
