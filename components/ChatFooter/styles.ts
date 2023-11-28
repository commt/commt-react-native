import styled from "styled-components/native";

export const TypingContainer = styled.View<{ isCommunityChat: boolean }>`
  flex-direction: row;
  margin-left: ${({ theme, isCommunityChat }) =>
    isCommunityChat ? `${theme.spacing.m}px` : "0"};
  margin-bottom: ${({ theme }) => theme.spacing.m}px;
  gap: -${({ theme }) => theme.spacing.m}px;
  align-items: flex-start;
`;
