import { useState, useContext, useEffect, useRef } from "react";
import { CommtContext } from "../context/Context";
import { setMessages } from "../context/actions/messagesAction";
import { updateLastMessage } from "../context/actions/roomsActions";

export type MessageActionProps = {
  id: string;
  text: string;
  createdAt: Date;
  type: string;
  roomId: string;
  user: string;
};

const useSetMessages = () => {
  const {
    state: {
      rooms,
      users: { users },
    },
    dispatch,
  } = useContext(CommtContext);

  const [_messages, _setMessages] = useState<MessageActionProps[]>([]);
  const isInitialize = useRef(true);

  const setMessagesAction = (messages: MessageActionProps[]) => {
    isInitialize.current = false; // Set initialize to false

    const roomIds = [...new Set(messages.map((message) => message.roomId))]; // Get every unique roomId

    // Create messages object by set roomId as key and messages for that particular roomId as value
    const formattedMessages = Object.fromEntries(
      roomIds.map((roomId) => [
        roomId,
        messages
          .filter((message) => message.roomId === roomId)
          .map((message) => {
            const isGroupChat = !!rooms.find(
              (room) => room.roomId === message.roomId,
            )?.groupAvatar;
            const senderUser = isGroupChat
              ? users.find((user) => user._id === message.user)
              : null;
            return {
              _id: message.id,
              text: message.text,
              createdAt: message.createdAt,
              type: message.type,
              senderId: message.user,
              user: {
                _id: message.user,
                ...(senderUser ? { avatar: senderUser.avatar } : {}),
                ...(senderUser ? { name: senderUser.username } : {}),
              },
            };
          }),
      ]),
    );

    // Set the lastMessage for each room in context
    rooms.forEach(({ roomId }) => {
      updateLastMessage({
        roomId,
        lastMessage: formattedMessages[roomId]?.[0],
      })(dispatch);
    });

    setMessages(formattedMessages)(dispatch);
  };

  useEffect(() => {
    if (
      rooms.length > 0 &&
      users.length > 0 &&
      _messages.length > 0 &&
      isInitialize.current
    ) {
      setMessagesAction(_messages);
    }
  }, [users, rooms, _messages]);

  return _setMessages;
};

export default useSetMessages;
