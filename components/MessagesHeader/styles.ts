import { styled } from "styled-components/native";

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
  padding-horizontal: ${({ theme }) => theme.spacing.m}px;
  background-color: ${({ theme }) => theme.colors.app.app3};
`;

export const Title = styled.Text`
  flex: 1;
  font-family: ${({ theme }) => theme.typography.family.semi_bold};
  font-size: ${({ theme }) => theme.typography.size.xl}px;
  color: ${({ theme }) => theme.colors.app.app1};
  line-height: ${({ theme }) => theme.spacing.xl}px;
`;
