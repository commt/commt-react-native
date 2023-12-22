import React from "react";
import { styles, SendView } from "./styles";
import { ICustomMessage } from "../../context/reducers/messagesReducer";
import { Send, SendProps } from "react-native-gifted-chat";
import PaperPlane from "../../assets/icons/svg/PaperPlane";
import { useTheme } from "styled-components/native";

const SendButton = (props: SendProps<ICustomMessage>) => {
  const theme = useTheme();
  return (
    <Send {...props} containerStyle={styles(theme).sendContainerStyle}>
      <SendView>
        <PaperPlane />
      </SendView>
    </Send>
  );
};

export default SendButton;
