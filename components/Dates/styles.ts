import { styled } from "styled-components/native";

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.ui.ui9};
  padding-vertical: ${({ theme }) => theme.spacing.s}px;
`;

export const Line = styled.View<{ direction: string }>`
  flex: 1;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.ui.ui5};
  margin-${({ direction }) => direction}: ${({ theme }) => theme.spacing.m}px;
`;

export const DateText = styled.Text`
  font-family: ${({ theme }) => theme.typography.family.medium};
  font-size: ${({ theme }) => theme.typography.size.s}px;
  color: ${({ theme }) => theme.colors.ui.ui3};
  line-height: ${({ theme }) => theme.spacing.m}px;
  margin-horizontal: ${({ theme }) => theme.spacing.m}px;
`;
