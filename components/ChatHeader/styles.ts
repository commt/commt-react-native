import styled from "styled-components/native";

export const Container = styled.View`
  flex-direction: row;
  padding-horizontal: ${({ theme }) => theme.spacing.m}px;
  padding-vertical: ${({ theme }) => theme.spacing.s}px;
  background-color: ${({ theme }) => theme.colors.ui.ui6};
  align-items: center;
`;

export const HeaderInfo = styled.View`
  flex: 1;
  justify-content: center;
`;

export const UserOrGroupName = styled.Text`
  font-family: ${({ theme }) => theme.typography.family.semi_bold};
  font-size: ${({ theme }) => theme.typography.size.md}px;
  color: ${({ theme }) => theme.colors.app.app1};
  line-height: ${({ theme }) => theme.spacing.l}px;
`;

export const UnderText = styled.Text<{ typing?: string | null }>`
  font-family: ${({ theme }) => theme.typography.family.bold};
  font-size: ${({ theme }) => theme.typography.size.s}px;
  color: ${({ theme, typing }) =>
    typing ? theme.colors.ui.ui8 : theme.colors.app.app2};
  line-height: ${({ theme }) => theme.spacing.m}px;
`;
