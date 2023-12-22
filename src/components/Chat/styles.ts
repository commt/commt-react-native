import { StyleSheet } from "react-native";
import styled, { DefaultTheme } from "styled-components/native";
import { Theme } from "rn-emoji-keyboard/lib/typescript/src/contexts/KeyboardContext";

type EmojiKeyboardStyle<T extends Theme> = Omit<
  T,
  "emoji" | "skinTonesContainer" | "backdrop" | "knob"
>;

export const styles = (theme: DefaultTheme | undefined) =>
  StyleSheet.create({
    messageContainerStyle: {
      backgroundColor: theme?.colors.ui.ui9,
      paddingBottom: 40,
    },
    emojiKeyboardStyle: {
      container: theme?.colors.app.app3,
      header: theme?.colors.app.app2,
      category: {
        iconActive: theme?.colors.brand.brand2,
        container: theme?.colors.app.app2,
        containerActive: theme?.colors.app.app3,
      },
      search: {
        text: theme?.colors.ui.ui1,
        placeholder: theme?.colors.ui.ui3,
        icon: theme?.colors.ui.ui2,
        background: theme?.colors.ui.ui5,
      },
    } as EmojiKeyboardStyle<any>,
  });

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.ui.ui6};
`;
