import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.app.app3};
  padding-left: ${({ theme }) => theme.spacing.m}px;
  padding-bottom: ${({ theme }) => theme.spacing.m}px;
  border-bottom-width: 1.5px;
  border-bottom-color: ${({ theme }) => theme.colors.ui.ui5};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.typography.family.semi_bold};
  font-size: ${({ theme }) => theme.typography.size.s}px;
  color: ${({ theme }) => theme.colors.ui.ui3};
  line-height: ${({ theme }) => theme.spacing.m}px;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;
