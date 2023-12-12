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
import { handleLogger } from "../service";
import * as events from "./events";

const SocketController = () => {
  const {
    state: {
      rooms,
      users: { selfUser, users },
      app: {
        configs: {
          indicators,
          tenantId,
          apiKey,
          subscriptionKey,
          secretKey,
          projectName,
        },
      },
    },
    dispatch,
  } = useContext(CommtContext);

  useEffect(() => {
    // initialize socket connection
    try {
      connect({
        chatAuthId: selfUser?.chatAuthId,
        tenantId,
        auth: { apiKey, subscriptionKey },
      });
    } catch (error) {
      handleLogger({
        apiKey,
        subscriptionKey,
        projectName,
        chatAuthId: selfUser?.chatAuthId,
        error: {
          error,
          event: events.INITIALIZE_SOCKET_CONNECT,
        },
      });
    }

    return () => {
      socket.disconnect();
    };
  }, [selfUser?.chatAuthId]);

  useEffect(() => {
    // listen authentication error
    socket.on(types.CONNECT_ERROR, (error) => {
      handleLogger({
        apiKey,
        subscriptionKey,
        projectName,
        chatAuthId: selfUser?.chatAuthId,
        error: {
          error,
          event: types.CONNECT_ERROR,
        },
      });
    });
  }, []);

  useEffect(() => {
    const chatRoomAuthIds = rooms.map(({ chatRoomAuthId }) => chatRoomAuthId);
    // join all rooms
    try {
      socket?.emit(types.JOIN_ROOMS, chatRoomAuthIds, (joinedRooms) => {
        console.log("JOINED", joinedRooms);
      });
    } catch (error) {
      handleLogger({
        apiKey,
        subscriptionKey,
        projectName,
        chatAuthId: selfUser?.chatAuthId,
        error: {
          error,
          event: types.JOIN_ROOMS,
        },
      });
    }
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
        try {
          updateUserOnline({ chatAuthId, online: true })(dispatch);
        } catch (error) {
          handleLogger({
            apiKey,
            subscriptionKey,
            projectName,
            chatAuthId: selfUser?.chatAuthId,
            error: {
              error,
              event: types.USER_ACTIVE,
            },
          });
        }
      });
    }
  }, []);

  useEffect(() => {
    if (indicators.includes(IndicatorProps.ONLINE)) {
      socket.on(types.USER_DISCONNECTED, (chatAuthId) => {
        try {
          updateUserOnline({ chatAuthId, online: false })(dispatch);
        } catch (error) {
          handleLogger({
            apiKey,
            subscriptionKey,
            projectName,
            chatAuthId: selfUser?.chatAuthId,
            error: {
              error,
              event: types.USER_DISCONNECTED,
            },
          });
        }
      });
    }
  }, []);

  useEffect(() => {
    if (indicators.includes(IndicatorProps.TYPING)) {
      socket.on(types.RECEIVE_TYPING_STATUS, (data) => {
        try {
          updateTypingUsers(data)(dispatch);
        } catch (error) {
          handleLogger({
            apiKey,
            subscriptionKey,
            projectName,
            chatAuthId: selfUser?.chatAuthId,
            chatRoomAuthId: data.chatRoomAuthId,
            error: {
              error,
              event: types.RECEIVE_TYPING_STATUS,
            },
          });
        }
      });
    }
  }, [indicators]);

  useEffect(() => {
    if (indicators.includes(IndicatorProps.MESSAGE_READ)) {
      socket.on(types.RECEIVE_READ_TOKEN, (data) => {
        try {
          updateReadToken(data)(dispatch);
        } catch (error) {
          handleLogger({
            apiKey,
            subscriptionKey,
            projectName,
            chatAuthId: selfUser?.chatAuthId,
            chatRoomAuthId: data.chatRoomAuthId,
            error: {
              error,
              event: types.RECEIVE_READ_TOKEN,
            },
          });
        }
      });
    }
  }, []);

  useEffect(() => {
    socket.on(types.JOIN_NEW_ROOM, (data) => {
      try {
        addRoom(data.room)(dispatch);
      } catch (error) {
        handleLogger({
          apiKey,
          subscriptionKey,
          projectName,
          chatAuthId: selfUser?.chatAuthId,
          chatRoomAuthId: data.room.chatRoomAuthId,
          error: {
            error,
            event: types.JOIN_NEW_ROOM,
          },
        });
      }
    });
  }, []);

  const handleMessage = (data: DataProps) => {
    try {
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
    } catch (error) {
      handleLogger({
        apiKey,
        subscriptionKey,
        projectName,
        chatAuthId: selfUser?.chatAuthId,
        error: {
          error,
          event: types.RECEIVE_MESSAGE,
        },
      });
    }
  };

  return null;
};

export default SocketController;
