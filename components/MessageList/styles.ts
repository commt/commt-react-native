import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  padding-horizontal: ${({ theme }) => theme.spacing.m}px;
  background-color: ${({ theme }) => theme.colors.app.app3};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.typography.family.semi_bold};
  font-size: ${({ theme }) => theme.typography.size.s}px;
  color: ${({ theme }) => theme.colors.ui.ui3};
  line-height: ${({ theme }) => theme.spacing.m}px;
`;
