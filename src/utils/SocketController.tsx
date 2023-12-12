import { useEffect, useContext } from "react";
import { connect, socket, DataProps, MessageInfoProps } from "./socket";
import { CommtContext } from "../context/Context";
import * as types from "./emitTypes";
import { updateUserOnline } from "../context/actions/usersActions";
import { addMessage } from "../context/actions/messagesAction";
import {
  addRoom,
  updateLastMessage,
  updateReadToken,
} from "../context/actions/roomsActions";
import { updateTypingUsers } from "../context/actions/typingUsersAction";
import { IndicatorProps } from "../context/reducers/appReducer";
import { aesDecrypt } from "./encryption";

const SocketController = () => {
  const {
    state: {
      rooms,
      users: { selfUser, users },
      app: {
        configs: { indicators, tenantId, apiKey, subscriptionKey, secretKey },
      },
    },
    dispatch,
  } = useContext(CommtContext);

  useEffect(() => {
    // initialize socket connection
    connect({
      chatAuthId: selfUser?.chatAuthId,
      tenantId,
      auth: { apiKey, subscriptionKey },
    });

    return () => {
      socket.disconnect();
    };
  }, [selfUser?.chatAuthId]);

  useEffect(() => {
    // listen authentication error
    socket.on(types.CONNECT_ERROR, (err) => {
      console.log("errrr", err.message);
    });
  }, []);

  useEffect(() => {
    const chatRoomAuthIds = rooms.map(({ chatRoomAuthId }) => chatRoomAuthId);
    // join all rooms
    socket?.emit(types.JOIN_ROOMS, chatRoomAuthIds, (joinedRooms) => {
      console.log("JOINED", joinedRooms);
    });
  }, [socket, rooms]);

  useEffect(() => {
    socket.on(types.RECEIVE_MESSAGE, handleMessage);
    return () => {
      socket.off(types.RECEIVE_MESSAGE, handleMessage);
    };
  }, [users]);

  useEffect(() => {
    if (indicators.includes(IndicatorProps.ONLINE)) {
      socket.on(types.USER_ACTIVE, (chatAuthId) => {
        updateUserOnline({ chatAuthId, online: true })(dispatch);
      });
    }
  }, []);

  useEffect(() => {
    if (indicators.includes(IndicatorProps.ONLINE)) {
      socket.on(types.USER_DISCONNECTED, (chatAuthId) => {
        updateUserOnline({ chatAuthId, online: false })(dispatch);
      });
    }
  }, []);

  useEffect(() => {
    if (indicators.includes(IndicatorProps.TYPING)) {
      socket.on(types.RECEIVE_TYPING_STATUS, (data) => {
        updateTypingUsers(data)(dispatch);
      });
    }
  }, [indicators]);

  useEffect(() => {
    if (indicators.includes(IndicatorProps.MESSAGE_READ)) {
      socket.on(types.RECEIVE_READ_TOKEN, (data) => {
        updateReadToken(data)(dispatch);
      });
    }
  }, []);

  useEffect(() => {
    socket.on(types.JOIN_NEW_ROOM, (data) => {
      addRoom(data.room)(dispatch);
    });
  }, []);

  const handleMessage = (data: DataProps) => {
    const { message: messageData, iv } = data;
    // decrypt the encrypted message
    const decryptedMessage: MessageInfoProps = JSON.parse(
      aesDecrypt({
        key: secretKey,
        iv,
        encryptedMessageData: messageData,
      }),
    );

    let { message } = decryptedMessage;
    const { roomId } = decryptedMessage;

    message = { ...message, user: { _id: message.senderId } };
    const room = rooms.find(({ roomId: Id }) => Id === roomId);

    // if message belongs community room, add avatar and name to user object
    if (room && room.groupAvatar) {
      const senderUser = users.find((user) => user._id === message.senderId);

      if (senderUser) {
        message.user = {
          ...message.user,
          avatar: senderUser.avatar,
          name: senderUser.username,
        };
      }
    }
    // update context messages structure
    addMessage({ message, roomId })(dispatch);
    updateLastMessage({
      lastMessage: message,
      roomId: roomId,
    })(dispatch);
  };

  return null;
};

export default SocketController;
