import { StyleSheet } from "react-native";
import { DefaultTheme, styled } from "styled-components/native";

export const styles = (theme: DefaultTheme | undefined) =>
  StyleSheet.create({
    sendContainerStyle: {
      paddingRight: theme?.spacing.xs,
      alignSelf: "center",
    },
  });

export const SendView = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.colors.brand.brand3};
  align-items: center;
  justify-content: center;
`;
