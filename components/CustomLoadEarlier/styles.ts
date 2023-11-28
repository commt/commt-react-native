import { StyleSheet } from "react-native";
import { DefaultTheme } from "styled-components/native";

export const styles = (theme: DefaultTheme | undefined) =>
  StyleSheet.create({
    wrapperStyle: {
      backgroundColor: theme?.colors.ui.ui4,
      borderRadius: 20,
      alignSelf: "center",
      width: "20%",
    },
    textStyle: {
      fontFamily: theme?.typography.family.bold,
      fontSize: theme?.typography.size.s,
      color: theme?.colors.ui.ui3,
      lineHeight: theme?.spacing.m,
    },
  });
