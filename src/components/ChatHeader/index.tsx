import React, { useContext, useState, useEffect } from "react";
import { Container, UserOrGroupName, HeaderInfo, UnderText } from "./styles";
import Avatar from "../Avatar";
import { CommtContext } from "../../context/Context";
import useTypingUsers from "../../hooks/useTypingUsers";
import PopUpButtons, { PopUpButtonsProps } from "../PopUpButtons";
import { IndicatorProps } from "../../context/reducers/appReducer";
import { RoomProps } from "src/context/reducers/roomsReducer";

interface ChatHeaderProps extends PopUpButtonsProps {
  roomId?: string;
  participants?: Array<string>;
  onUserProfileClick?: () => void;
  leftComponent?: React.JSX.Element;
}

const ChatHeader = ({
  roomId,
  participants,
  popUpButtons,
  onUserProfileClick,
  leftComponent,
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

  const [activeRoom, setActiveRoom] = useState<RoomProps | undefined>(
    rooms.find((room) => room.roomId === roomId),
  );
  const typingUserNames = useTypingUsers(activeRoom?.chatRoomAuthId ?? null);

  useEffect(() => {
    if (!activeRoom && !roomId && participants) {
      // If no specific room is provided, no active room exists, and participants are available,
      // that indicates that a new room has not been created yet.

      // Find the new room and the room participants match the participants
      const newRoom = rooms.find((room) =>
        participants.every((id) => room.participants.includes(id)),
      );
      newRoom && setActiveRoom(newRoom);
    }
  }, [rooms]);

  // If 'room' exists, find the opposite user Id in ' activeRoom.participants'; otherwise, search in 'participants'.
  const oppositeUserId = activeRoom
    ? activeRoom.groupName
      ? null
      : activeRoom.participants.find(
          (id) => id !== selfUser?._id && !id.startsWith("system"),
        )
    : participants?.find(
        (id) => id !== selfUser?._id && !id.startsWith("system"),
      );
  const oppositeUser = users.find(({ _id }) => _id === oppositeUserId);

  const renderMembersOrOnline = () => {
    if (activeRoom?.groupAvatar) {
      // This room is a group chat
      const memberNames =
        users
          .filter(({ _id }) => activeRoom.participants.includes(_id))
          .map(({ username }) => username)
          .slice(0, 3)
          .join(", ") +
        (activeRoom.participants.length > 3
          ? ` and ${activeRoom.participants.length - 3}`
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
      {leftComponent}
      {(activeRoom?.groupAvatar || oppositeUser?.avatar) && (
        <Avatar
          uri={activeRoom?.groupAvatar ?? oppositeUser?.avatar}
          online={oppositeUser?.online ?? false}
          onPress={onUserProfileClick}
        />
      )}
      <HeaderInfo>
        <UserOrGroupName onPress={onUserProfileClick}>
          {activeRoom?.groupName ?? oppositeUser?.username}
        </UserOrGroupName>
        {renderMembersOrOnline()}
      </HeaderInfo>
      {popUpButtons && <PopUpButtons popUpButtons={popUpButtons} />}
    </Container>
  );
};

export default ChatHeader;
