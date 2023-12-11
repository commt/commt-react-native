import React from "react";
import { styles } from "./styles";
import { Avatar, AvatarProps, IMessage } from "react-native-gifted-chat";
import { RoomProps } from "../../context/reducers/roomsReducer";
import { useTheme } from "styled-components/native";

interface CustomAvatarProps extends AvatarProps<IMessage> {
  activeRoom: RoomProps | undefined;
}

const CustomAvatar = (props: CustomAvatarProps) => {
  const theme = useTheme();
  // render user avatar just for community chat
  if (props.activeRoom?.groupAvatar) {
    return <Avatar {...props} imageStyle={styles(theme).avatarImageStle} />;
  }
};

export default CustomAvatar;
