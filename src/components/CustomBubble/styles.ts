import { StyleSheet } from "react-native";
import { LeftRightStyle } from "react-native-gifted-chat";
import { DefaultTheme, styled } from "styled-components/native";

export const styles = (theme: DefaultTheme | undefined) =>
  StyleSheet.create({
    bubbleWrapperStyle: {
      right: {
        backgroundColor: theme?.colors.brand.brand5,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        borderBottomRightRadius: 2,
        borderBottomLeftRadius: 12,
        paddingTop: theme?.spacing.s,
        paddingRight: theme?.spacing.xl,
        paddingBottom: theme?.spacing.sm,
        paddingLeft: theme?.spacing.xs,
        marginRight: theme?.spacing.xs,
        maxWidth: "80%",
      },
      left: {
        backgroundColor: theme?.colors.ui.ui4,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        borderBottomRightRadius: 12,
        borderBottomLeftRadius: 2,
        paddingTop: theme?.spacing.s,
        paddingRight: theme?.spacing.md,
        paddingBottom: theme?.spacing.sm,
        paddingLeft: theme?.spacing.xs,
        borderWidth: 1,
        borderColor: theme?.colors.ui.ui10,
        maxWidth: "80%",
      },
    } as LeftRightStyle<any>,
    bubbleTextStyle: {
      right: {
        fontFamily: theme?.typography.family.medium,
        fontSize: theme?.typography.size.sm,
        color: theme?.colors.app.app4,
        lineHeight: 18,
      },
      left: {
        fontFamily: theme?.typography.family.medium,
        fontSize: theme?.typography.size.sm,
        color: theme?.colors.ui.ui1,
        lineHeight: 18,
      },
    } as LeftRightStyle<any>,
    timeTextStyle: {
      right: {
        fontFamily: theme?.typography.family.bold,
        fontSize: theme?.typography.size.s,
        color: theme?.colors.ui.ui3,
        lineHeight: theme?.spacing.m,
        marginTop: theme?.spacing.xs,
      },
      left: {
        fontFamily: theme?.typography.family.bold,
        fontSize: theme?.typography.size.s,
        color: theme?.colors.ui.ui3,
        lineHeight: theme?.spacing.m,
        marginTop: theme?.spacing.xs,
        left: -theme?.spacing.s,
      },
    } as LeftRightStyle<any>,
  });

export const BubbleContainer = styled.View`
  flex-direction: column;
`;

export const BubbleBottomContainer = styled.View<{
  pos: string;
  isGroupChat: boolean;
}>`
  flex-direction: row;
  align-items: center;
  justify-content: ${({ pos }) =>
    pos === "right" ? "flex-end" : "flex-start"};
  padding-left: ${({ isGroupChat, theme }) =>
    isGroupChat ? -theme.spacing.xs : 0}px;
  right: ${({ pos, theme }) => (pos === "right" ? theme.spacing.xs : "0")}px;
`;
