import React, { useContext } from "react";
import { Username } from "./styles";
import { RoomProps } from "../../context/reducers/roomsReducer";
import { ICustomMessage } from "../../context/reducers/messagesReducer";
import { CommtContext } from "../../context/Context";
import { BubbleProps } from "react-native-gifted-chat";

interface CustomUsernameViewProps extends BubbleProps<ICustomMessage> {
  activeRoom: RoomProps | undefined;
}

const CustomUsernameView = (props: CustomUsernameViewProps) => {
  const {
    state: {
      users: { selfUser },
    },
  } = useContext(CommtContext);
  //render username if room is group and message belongs to opposite user
  if (
    props.activeRoom?.groupName &&
    props.currentMessage?.user._id !== selfUser?._id
  ) {
    return <Username>{props.currentMessage?.user?.name}</Username>;
  }
  return null;
};

export default CustomUsernameView;
