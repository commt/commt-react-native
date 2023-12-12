import React from "react";
import { styles } from "./styles";
import { ICustomMessage } from "../../context/reducers/messagesReducer";
import { InputToolbarProps, InputToolbar } from "react-native-gifted-chat";
import { useTheme } from "styled-components/native";

const CustomInputToolbar = (props: InputToolbarProps<ICustomMessage>) => {
  const theme = useTheme();
  return (
    <InputToolbar
      {...props}
      containerStyle={styles(theme).inputBarContainerStyle}
      primaryStyle={styles(theme).inputBarPrimaryStyle}
    />
  );
};

export default CustomInputToolbar;
