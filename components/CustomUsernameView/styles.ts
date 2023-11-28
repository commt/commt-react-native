import { styled } from "styled-components/native";

export const Username = styled.Text`
  font-family: ${({ theme }) => theme.typography.family.medium};
  font-size: ${({ theme }) => theme.typography.size.s}px;
  color: ${({ theme }) => theme.colors.app.app2};
  line-height: ${({ theme }) => theme.spacing.m}px;
  margin-left: ${({ theme }) => theme.spacing.s}px;
`;
