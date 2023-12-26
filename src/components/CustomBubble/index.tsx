import React, { useContext } from "react";
import dayjs from "dayjs";
import { useTheme } from "styled-components/native";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { CommtContext } from "../../context/Context";
import { Bubble, BubbleProps, IMessage, Time } from "react-native-gifted-chat";
import { ICustomMessage } from "../../context/reducers/messagesReducer";
import { RoomProps } from "../../context/reducers/roomsReducer";
import { IndicatorProps } from "../../context/reducers/appReducer";
import FilledDoubleCheck from "../../assets/icons/svg/FilledDoubleCheck";
import SingleCheck from "../../assets/icons/svg/SingleCheck";
import { BubbleBottomContainer, BubbleContainer, styles } from "./styles";
dayjs.extend(isSameOrAfter);

interface ReadInfoProps {
  currentMessage: IMessage | undefined;
  activeRoom: RoomProps | undefined;
}

interface CustomBubbleProps extends BubbleProps<ICustomMessage> {
  activeRoom: RoomProps | undefined;
}

const ReadInfo = ({ currentMessage, activeRoom }: ReadInfoProps) => {
  const {
    state: {
      users: { selfUser },
    },
  } = useContext(CommtContext);

  const theme = useTheme();

  // If current message belongs to self user
  if (currentMessage?.user?._id === selfUser?._id && activeRoom) {
    // If this message belongs the community room
    if (activeRoom.groupAvatar) {
      return <SingleCheck />;
    } else {
      // Receiver user had read the message
      return dayjs(activeRoom.lastMessageReadToken).isSameOrAfter(
        dayjs(currentMessage?.createdAt),
      ) ? (
        <FilledDoubleCheck color={theme?.colors.brand.brand2} />
      ) : (
        <SingleCheck />
      );
    }
  }

  return <></>;
};

const CustomBubble = (props: CustomBubbleProps) => {
  const {
    state: {
      app: {
        configs: { indicators },
      },
    },
  } = useContext(CommtContext);

  const theme = useTheme();
  return (
    <BubbleContainer>
      <Bubble
        {...props}
        wrapperStyle={styles(theme).bubbleWrapperStyle}
        textStyle={styles(theme).bubbleTextStyle}
        renderTime={() => null}
      />
      <BubbleBottomContainer
        pos={props.position}
        isGroupChat={props.activeRoom?.groupAvatar ? true : false}>
        <Time {...props} timeTextStyle={styles(theme).timeTextStyle} />
        {indicators.includes(IndicatorProps.MESSAGE_READ) && (
          <ReadInfo
            currentMessage={props.currentMessage}
            activeRoom={props.activeRoom}
          />
        )}
      </BubbleBottomContainer>
    </BubbleContainer>
  );
};

export default CustomBubble;
