import styled from "styled-components/native";

export const Container = styled.View`
  align-self: center;
  margin-vertical: ${({ theme }) => theme.spacing.m}px;
`;

export const Time = styled.Text`
  align-self: flex-end;
  font-family: ${({ theme }) => theme.typography.family.bold};
  font-size: ${({ theme }) => theme.typography.size.s}px;
  color: ${({ theme }) => theme.colors.ui.ui3};
  line-height: ${({ theme }) => theme.spacing.m}px;
  margin-top: ${({ theme }) => theme.spacing.xs}px;
`;

export const Button = styled.Pressable`
  background-color: ${({ theme }) => theme.colors.brand.brand3};
  width: 200px;
  height: 50px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

export const ButtonTitle = styled.Text`
  font-family: ${({ theme }) => theme.typography.family.semi_bold};
  font-size: ${({ theme }) => theme.typography.size.md}px;
  color: ${({ theme }) => theme.colors.app.app4};
  line-height: 18px;
`;

export const TextContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.ui.ui3};
  padding: ${({ theme }) => theme.spacing.m}px;
  border-radius: 10px;
  max-width: 70%;
`;

export const TextMessage = styled.Text`
  font-family: ${({ theme }) => theme.typography.family.medium};
  font-size: ${({ theme }) => theme.typography.size.sm}px;
  color: ${({ theme }) => theme.colors.app.app1};
  line-height: 18px;
`;

export const ImageMessage = styled.Image`
  width: 200px;
  height: 200px;
  resize-mode: contain;
  border-radius: 5px;
`;
