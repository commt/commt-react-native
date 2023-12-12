import React from "react";
import { styles } from "./styles";
import { Composer, ComposerProps } from "react-native-gifted-chat";
import { useTheme } from "styled-components/native";

const CustomComposer = (props: ComposerProps) => {
  const theme = useTheme();
  return (
    <Composer
      {...props}
      placeholder="Type here..."
      placeholderTextColor={theme?.colors.ui.ui3}
      textInputStyle={styles(theme).textInputStyle}
    />
  );
};

export default CustomComposer;
