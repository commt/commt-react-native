import React, { useContext } from "react";
import { FlatList } from "react-native";
import { Container, Title } from "./styles";
import Avatar from "../Avatar";
import { UserProps } from "../../context/reducers/usersReducer";
import { CommtContext } from "../../context/Context";

type OnPressProps = {
  roomId?: string;
  participants?: Array<string>;
};

interface QuickChatProps {
  onPress: (props: OnPressProps) => void;
}

const QuickChat = ({ onPress }: QuickChatProps) => {
  const {
    state: {
      users: { selfUser, users },
      rooms,
    },
  } = useContext(CommtContext);

  const renderItem = ({ item: user }: { item: UserProps }) => {
    const participants = [user._id!, selfUser!._id];
    // Filter the rooms array to find rooms where both participants are present
    const foundedRooms = rooms.filter((room) =>
      participants.every((id) => room.participants.includes(id)),
    );
    // TODO: There will be extra condition here to filter the only mostly active rooms instead of private!
    // Find the private room
    const isPrivateRoomId = foundedRooms.find((room) => !room.groupAvatar)
      ?.roomId;
    return (
      <Avatar
        uri={user.avatar}
        userName={user.username}
        online={user.online ?? false}
        onPress={() => onPress({ participants, roomId: isPrivateRoomId })}
      />
    );
  };

  return (
    <Container>
      <Title>QUICK CHAT</Title>
      {users.length > 0 && (
        <FlatList
          data={users.filter((user) => user._id !== selfUser?._id)}
          renderItem={renderItem}
          keyExtractor={(item: UserProps) => item._id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      )}
    </Container>
  );
};

export default QuickChat;
