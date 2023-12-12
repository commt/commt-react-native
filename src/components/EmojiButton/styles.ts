import { StyleSheet } from "react-native";
import { DefaultTheme } from "styled-components/native";

export const styles = (theme: DefaultTheme | undefined) =>
  StyleSheet.create({
    containerStyle: {
      paddingLeft: theme?.spacing.s,
      justifyContent: "center",
    },
  });
