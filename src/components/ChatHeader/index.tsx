import React, { useContext } from "react";
import { Container, UserOrGroupName, HeaderInfo, UnderText } from "./styles";
import Avatar from "../Avatar";
import { CommtContext } from "../../context/Context";
import useTypingUsers from "../../hooks/useTypingUsers";
import PopUpButtons, { PopUpButtonsProps } from "../PopUpButtons";
import { IndicatorProps } from "../../context/reducers/appReducer";

interface ChatHeaderProps extends PopUpButtonsProps {
  roomId?: string;
  participants?: Array<string>;
}

const ChatHeader = ({
  roomId,
  participants,
  popUpButtons,
}: ChatHeaderProps) => {
  const {
    state: {
      users: { selfUser, users },
      rooms,
      app: {
        configs: { indicators },
      },
    },
  } = useContext(CommtContext);

  const room = rooms.find((room) => room.roomId === roomId);
  const typingUserNames = useTypingUsers(room?.chatRoomAuthId ?? null);
  // If 'room' exists, find the opposite user Id in 'room.participants'; otherwise, search in 'participants'.
  const oppositeUserId = room
    ? room.groupName
      ? null
      : room.participants.find(
          (id) => id !== selfUser?._id && !id.startsWith("system"),
        )
    : participants?.find(
        (id) => id !== selfUser?._id && !id.startsWith("system"),
      );
  const oppositeUser = users.find(({ _id }) => _id === oppositeUserId);

  const renderMembersOrOnline = () => {
    if (room?.groupAvatar) {
      // This room is a group chat
      const memberNames =
        users
          .filter(({ _id }) => room.participants.includes(_id))
          .map(({ username }) => username)
          .slice(0, 3)
          .join(", ") +
        (room.participants.length > 3
          ? ` and ${room.participants.length - 3}`
          : "");

      return typingUserNames ? (
        <UnderText typing={typingUserNames}>
          {typingUserNames} typing...
        </UnderText>
      ) : (
        <UnderText>{memberNames}</UnderText>
      );
    }
    // This is room is a 1:1 private chat room so check oppositeUser online and typing status
    return typingUserNames ? (
      <UnderText typing={typingUserNames}>typing...</UnderText>
    ) : (
      indicators.includes(IndicatorProps.ONLINE) &&
        (oppositeUser?.online ? <UnderText>Online</UnderText> : null)
    );
  };

  return (
    <Container>
      {(room?.groupAvatar || oppositeUser?.avatar) && (
        <Avatar
          uri={room?.groupAvatar ?? oppositeUser?.avatar}
          online={oppositeUser?.online ?? false}
        />
      )}
      <HeaderInfo>
        <UserOrGroupName>
          {room?.groupName ?? oppositeUser?.username}
        </UserOrGroupName>
        {renderMembersOrOnline()}
      </HeaderInfo>
      {popUpButtons && <PopUpButtons popUpButtons={popUpButtons} />}
    </Container>
  );
};

export default ChatHeader;
