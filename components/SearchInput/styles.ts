import { styled } from "styled-components/native";
import TextInput from "../TextInput";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.ui.ui5};
  border-radius: 40px;
  margin-horizontal: ${({ theme }) => theme.spacing.m}px;
  flex-direction: row;
  align-items: center;
  padding-horizontal: ${({ theme }) => theme.spacing.sm}px;
`;

export const SearchTextInput = styled(TextInput)`
  color: ${({ theme }) => theme.colors.ui.ui1};
`;
