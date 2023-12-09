import React, { useEffect, useContext, useState } from "react";
import { FlatList } from "react-native";
import dayjs from "dayjs";
import RoomCard from "../RoomCard";
import { CommtContext } from "../../context/Context";
import { ICustomMessage } from "../../context/reducers/messagesReducer";
import { RoomProps } from "../../context/reducers/roomsReducer";
import { updateUnreadMsgCount } from "../../context/actions/roomsActions";
import { Container, Title } from "./styles";

interface MessageListProps {
  onPress: ({ roomId }: { roomId: string }) => void;
}

const sortRooms = (rooms: RoomProps[]) => {
  // sort the rooms according to last message time, uses of sort function => https://www.javascripttutorial.net/array/javascript-sort-an-array-of-objects/
  return rooms.sort((firstItem, secondItem): any => {
    if (firstItem.lastMessage && secondItem.lastMessage) {
      return dayjs(secondItem.lastMessage.createdAt).diff(
        dayjs(firstItem.lastMessage.createdAt),
      );
    }
    return 0;
  });
};

const MessageList = ({ onPress }: MessageListProps) => {
  const {
    state: {
      users: { users, selfUser },
      rooms,
      messages,
      app: { searchValue },
    },
    dispatch,
  } = useContext(CommtContext);

  const [filteredRooms, setFilteredRooms] = useState<RoomProps[]>([]);

  const getUnreadMessagesCount = ({
    roomId,
    lastMessageReadToken,
  }: {
    roomId: string;
    lastMessageReadToken: number;
  }) => {
    // filter the messages and check if the message sender is opposite user and the message time is greater than the last message read token. In this way that proofs the message was after the last time user had visited screen.
    const unReadMessages = messages[roomId]?.filter(
      (message: ICustomMessage) =>
        dayjs(message.createdAt).isAfter(dayjs(lastMessageReadToken)) &&
        message.user._id !== selfUser?._id,
    );
    return unReadMessages?.length;
  };

  useEffect(() => {
    // update unread message count for each room
    rooms.forEach((room: RoomProps) => {
      const isLastMessageBySelfUser =
        room.lastMessage?.user._id === selfUser?._id;

      const newCount = isLastMessageBySelfUser
        ? 0
        : getUnreadMessagesCount({
            roomId: room.roomId,
            lastMessageReadToken: room.lastMessageReadToken,
          });
      // Check if the count has changed before updating
      if (newCount !== room.unReadMessageCount) {
        updateUnreadMsgCount({ roomId: room.roomId, count: newCount })(
          dispatch,
        );
      }
    });
  }, [messages, rooms]);

  const getName = (room: RoomProps) => {
    if (room.groupName) {
      return room.groupName.toLowerCase();
    } else {
      const oppositeUserId = room.participants.find(
        (id) => id !== selfUser?._id && !id.startsWith("system"),
      );
      return (
        users
          .find((user) => user._id === oppositeUserId)
          ?.username.toLowerCase() || ""
      );
    }
  };

  const filterRooms = () => {
    const lowerCaseSearch = searchValue.toLowerCase();
    return (
      rooms
        .filter((room) => {
          const roomName = getName(room);
          return roomName.includes(lowerCaseSearch);
        })
        // Sort the rooms based on the index of the search value in their names.This ensures that rooms with a closer match to the search appear first.
        .sort((firstRoom, secondRoom) => {
          const firstName = getName(firstRoom);
          const secondName = getName(secondRoom);
          return (
            firstName.indexOf(lowerCaseSearch) -
            secondName.indexOf(lowerCaseSearch)
          );
        })
    );
  };

  useEffect(() => {
    if (searchValue) {
      setFilteredRooms(filterRooms());
    } else {
      setFilteredRooms(sortRooms(rooms));
    }
  }, [searchValue, rooms]);

  const renderItem = ({ item }: { item: RoomProps }) => (
    <RoomCard
      room={item}
      onClickAction={() => onPress({ roomId: item.roomId })}
    />
  );
  return (
    <Container>
      <Title>MESSAGES</Title>
      <FlatList
        data={filteredRooms}
        renderItem={renderItem}
        keyExtractor={(item: RoomProps) => item.roomId}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};

export default MessageList;
