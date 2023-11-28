import { StyleSheet, Platform } from "react-native";
import { DefaultTheme } from "styled-components/native";

export const styles = (theme: DefaultTheme | undefined) =>
  StyleSheet.create({
    textInputStyle: {
      fontFamily: theme?.typography.family.medium,
      fontSize: theme?.typography.size.sm,
      lineHeight: 18,
      color: theme?.colors.ui.ui1,
      right: theme?.spacing.s,
      ...(Platform.OS === "android" && { paddingTop: theme?.spacing.sm }), // If it's Android device add paddingTop to make it good visual
    },
  });
