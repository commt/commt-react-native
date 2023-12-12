import React from "react";
import { Keyboard } from "react-native";
import { styles } from "./styles";
import { Actions, ActionsProps } from "react-native-gifted-chat";
import EmojiIcon from "../../assets/icons/svg/EmojiIcon";
import { useTheme } from "styled-components/native";

interface EmojiButtonProps extends ActionsProps {
  setIsEmojiOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmojiButton = (props: EmojiButtonProps) => {
  const theme = useTheme();
  const { setIsEmojiOpen } = props;
  return (
    <Actions
      {...props}
      //Activate EmojiKeyboard
      onPressActionButton={() => {
        Keyboard.dismiss();
        setIsEmojiOpen((previous) => !previous);
      }}
      icon={() => <EmojiIcon />}
      containerStyle={styles(theme).containerStyle}
    />
  );
};

export default EmojiButton;
