import { StyleSheet } from "react-native";
import { LeftRightStyle } from "react-native-gifted-chat";
import { DefaultTheme } from "styled-components/native";

export const styles = (theme: DefaultTheme | undefined) =>
  StyleSheet.create({
    avatarImageStle: {
      left: {
        width: 24,
        height: 24,
        borderRadius: 100,
        marginLeft: theme?.spacing.s,
        marginRight: -theme?.spacing.s,
      },
    } as LeftRightStyle<any>,
  });
