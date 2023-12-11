import styled from "styled-components/native";

export const StyledTextInput = styled.TextInput`
  padding: ${({ theme }) => theme.spacing.s}px;
  font-family: ${({ theme }) => theme.typography.family.medium};
  font-size: ${({ theme }) => theme.typography.size.sm}px;
  line-height: 18px;
`;
