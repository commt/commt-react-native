import { StyleSheet } from "react-native";
import { DefaultTheme } from "styled-components/native";

export const styles = (theme: DefaultTheme | undefined) =>
  StyleSheet.create({
    inputBarContainerStyle: {
      borderTopWidth: 0,
      paddingBottom: theme?.spacing.md,
      paddingTop: theme?.spacing.m,
      backgroundColor: theme?.colors.ui.ui6,
    },
    inputBarPrimaryStyle: {
      backgroundColor: theme?.colors.ui.ui5,
      marginHorizontal: theme?.spacing.m,
      borderWidth: 2,
      borderRadius: 100,
      borderColor: theme?.colors.ui.ui10,
    },
  });
