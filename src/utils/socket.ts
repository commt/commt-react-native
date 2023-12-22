import { ICustomMessage } from "../context/reducers/messagesReducer";
import { Socket, io } from "socket.io-client";
import * as types from "./emitTypes";
import { RoomProps } from "../context/reducers/roomsReducer";
import { handleLogger } from "../service";

export type MessageInfoProps = {
  message: ICustomMessage;
  roomId: string;
  chatRoomAuthId: string;
};

export interface DataProps {
  message: string;
  iv: string; //  initialized vector (iv) is used for aes encryption
}

export interface TypingProps {
  isTyping: boolean;
  userId: string;
  chatRoomAuthId: string;
}

export interface ReadTokenProps {
  token: number;
  chatRoomAuthId: string;
}

export interface CreateRoomProps {
  participants: Array<string>;
  chatAuthIds: Array<string>;
  selfUserChatAuthId: string;
  tenantId: string;
}

interface ServerToClientEvents {
  [types.RECEIVE_MESSAGE]: (data: DataProps) => void;
  [types.USER_ACTIVE]: (chatAuthId: string) => void;
  [types.USER_DISCONNECTED]: (chatAuthId: string) => void;
  [types.RECEIVE_TYPING_STATUS]: (data: TypingProps) => void;
  [types.RECEIVE_READ_TOKEN]: (data: ReadTokenProps) => void;
  [types.JOIN_NEW_ROOM]: (data: { room: RoomProps }) => void;
  [types.CONNECT_ERROR]: (err: Error) => void;
  [types.UNSUBSCRIBE_ROOM]: (chatRoomAuthId: string) => void;
}

interface ClientToServerEvents {
  [types.JOIN_ROOMS]: (
    chatRoomAuthIds: string[],
    callback: (joinedRooms: string[]) => void,
  ) => void;

  [types.SEND_MESSAGE]: (
    data: DataProps,
    callback: ({ status }: { status: string }) => void,
  ) => void;

  [types.SEND_TYPING_STATUS]: (data: TypingProps) => void;

  [types.SEND_READ_TOKEN]: (data: ReadTokenProps) => void;

  [types.CREATE_NEW_ROOM]: (
    data: CreateRoomProps,
    callback: ({ room }: { room: RoomProps }) => void,
  ) => void;

  [types.LEAVE_ROOM]: (
    chatRoomAuthId: string,
    callback: ({ status }: { status: string }) => void,
  ) => void;
}

interface ConnectProps {
  chatAuthId: string | undefined;
  tenantId: string;
  projectId: string;
  auth: {
    apiKey: string;
  };
}

type HandleLogProps = {
  apiKey: string;
  projectId: string;
  chatAuthId: string;
  chatRoomAuthId?: string;
};

export let socket: Socket<ServerToClientEvents, ClientToServerEvents>;

export const connect = (props: ConnectProps) => {
  const { chatAuthId, tenantId, auth, projectId } = props;
  socket = io("https://service.commt.co", {
    query: { chatAuthId, tenantId, projectId },
    auth,
  });
};

export const sendMessage = (
  data: DataProps,
  callback: (status: string) => void,
  handleLogParams: HandleLogProps,
) => {
  try {
    socket.emit(types.SEND_MESSAGE, data, ({ status }) => {
      callback(status);
    });
  } catch (error) {
    handleLogger({
      ...handleLogParams,
      error: {
        error,
        event: types.SEND_MESSAGE,
      },
    });
  }
};

export const sendTypingStatus = (
  data: TypingProps,
  handleLogParams: HandleLogProps,
) => {
  try {
    socket.emit(types.SEND_TYPING_STATUS, data);
  } catch (error) {
    handleLogger({
      ...handleLogParams,
      chatRoomAuthId: data.chatRoomAuthId,
      error: {
        error,
        event: types.SEND_TYPING_STATUS,
      },
    });
  }
};

export const sendReadToken = (
  data: ReadTokenProps,
  handleLogParams: HandleLogProps,
) => {
  try {
    socket.emit(types.SEND_READ_TOKEN, data);
  } catch (error) {
    handleLogger({
      ...handleLogParams,
      chatRoomAuthId: data.chatRoomAuthId,
      error: {
        error,
        event: types.SEND_READ_TOKEN,
      },
    });
  }
};

export const createNewRoom = (
  data: CreateRoomProps,
  callback: (room: RoomProps) => void,
  handleLogParams: HandleLogProps,
) => {
  try {
    socket.emit(types.CREATE_NEW_ROOM, data, ({ room }) => {
      callback(room);
    });
  } catch (error) {
    handleLogger({
      ...handleLogParams,
      error: {
        error,
        event: types.CREATE_NEW_ROOM,
      },
    });
  }
};
