import React, { useContext } from "react";
import { View } from "react-native";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { useTheme } from "styled-components/native";
import {
  RoomItem,
  LeftContainer,
  UserName,
  MessageText,
  RightContainer,
  MessageTime,
  UnreadBadge,
  MessageCount,
} from "./styles";
import Avatar from "../Avatar";
import dayjs from "dayjs";
import { CommtContext } from "../../context/Context";
import { UserProps } from "../../context/reducers/usersReducer";
import { ICustomMessage } from "../../context/reducers/messagesReducer";
import { RoomProps } from "../../context/reducers/roomsReducer";
import { IndicatorProps } from "../../context/reducers/appReducer";
import FilledDoubleCheck from "../../assets/icons/svg/FilledDoubleCheck";
import SingleCheck from "../../assets/icons/svg/SingleCheck";
import useTypingUsers from "../../hooks/useTypingUsers";
dayjs.extend(isSameOrAfter);

interface MessageReadProps {
  isLastMessageBySelfUser: boolean;
  unReadMessageCount: number;
  lastMessage: ICustomMessage | undefined;
  lastMessageReadToken: number;
  isPrivateRoom: boolean;
}

interface RoomCardProps {
  room: RoomProps;
  onClickAction: () => void;
}

// Save todays date
const today = dayjs();
// Convert date to correct display depending on time from current day
const formatDate = (lastActivity: Date | number | undefined) => {
  const date = dayjs(lastActivity);
  switch (true) {
    // If last message was today show time
    case date.isSame(today, "day"): {
      return date.format("HH:MM");
    }
    // If last message was the day before show "yesterday"
    case date.isSame(today.subtract(1, "day"), "day"): {
      return "Yesterday";
    }
    // If last message later then teh day before show date
    default: {
      return date.format("DD/MM/YYYY");
    }
  }
};

const MessageReadInfo = ({
  isLastMessageBySelfUser,
  unReadMessageCount,
  lastMessage,
  lastMessageReadToken,
  isPrivateRoom,
}: MessageReadProps) => {
  const {
    state: {
      app: {
        configs: { indicators },
      },
    },
  } = useContext(CommtContext);
  const theme = useTheme();

  if (!lastMessage) return null;
  // Check if the "MESSAGE_READ" indicator is enabled
  if (isLastMessageBySelfUser) {
    // If last message belongs to self user
    switch (true) {
      // If the room is not a private instead a group
      case !isPrivateRoom ||
        !indicators.includes(IndicatorProps.MESSAGE_READ): {
        return <SingleCheck />;
      }
      // Receiver user had read the message
      case dayjs(lastMessageReadToken).isSameOrAfter(
        dayjs(lastMessage.createdAt),
      ): {
        return <FilledDoubleCheck color={theme?.colors.ui.ui8} />;
      }
      // Receiver user has not read the message
      case dayjs(lastMessageReadToken).isBefore(dayjs(lastMessage.createdAt)): {
        return <SingleCheck />;
      }
      default: {
        return null;
      }
    }
  } else if (unReadMessageCount > 0) {
    // If last message belongs to other user
    return (
      <UnreadBadge>
        <MessageCount>{unReadMessageCount}</MessageCount>
      </UnreadBadge>
    );
  }
  return null;
};

const RoomCard = ({ room, onClickAction }: RoomCardProps) => {
  const {
    state: {
      users: { selfUser, users },
    },
  } = useContext(CommtContext);
  const isLastMessageBySelfUser = room.lastMessage?.user._id === selfUser?._id;
  const typingUserNames = useTypingUsers(room.chatRoomAuthId);

  const oppositeUserId = room.groupName
    ? null
    : room.participants.find(
        (id) => id !== selfUser?._id && !id.startsWith("system"),
      );
  const oppositeUser = oppositeUserId
    ? users.find((user: UserProps) => user._id === oppositeUserId)
    : null;

  return (
    <RoomItem onPress={onClickAction}>
      <LeftContainer>
        <Avatar
          uri={room.groupAvatar ?? oppositeUser?.avatar}
          width={40}
          height={40}
          online={oppositeUser?.online ?? false}
        />
        <View>
          <UserName>{room.groupName ?? oppositeUser?.username}</UserName>
          {typingUserNames ? (
            <MessageText typing={typingUserNames}>
              {room.groupName ? typingUserNames : null} typing...
            </MessageText>
          ) : (
            <MessageText>
              {!isLastMessageBySelfUser && room.groupName
                ? `${room.lastMessage?.user.name}: `
                : ""}
              {room.lastMessage?.text &&
                room.lastMessage.text.slice(0, 25) +
                  (room.lastMessage.text.length > 25 ? "..." : "")}
            </MessageText>
          )}
        </View>
      </LeftContainer>
      <RightContainer>
        <MessageTime>{formatDate(room.lastMessage?.createdAt)}</MessageTime>
        <MessageReadInfo
          isLastMessageBySelfUser={isLastMessageBySelfUser}
          unReadMessageCount={room.unReadMessageCount}
          lastMessage={room.lastMessage}
          lastMessageReadToken={room.lastMessageReadToken}
          isPrivateRoom={!room.groupName}
        />
      </RightContainer>
    </RoomItem>
  );
};

export default RoomCard;
