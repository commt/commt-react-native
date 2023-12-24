import React from "react";
import { StyleProp, TextInputProps, TextStyle } from "react-native";
import { useTheme } from "styled-components/native";
import { StyledTextInput } from "./styles";

export interface InputProps extends TextInputProps {
  style?: StyleProp<TextStyle>;
}

const TextInput = ({ value, onChangeText, placeholder, style }: InputProps) => {
  const theme = useTheme();
  return (
    <StyledTextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={theme?.colors.ui.ui3}
      style={style}
    />
  );
};
export default TextInput;
