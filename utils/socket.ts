import { ICustomMessage } from "../context/reducers/messagesReducer";
import { Socket, io } from "socket.io-client";
import * as types from "./emitTypes";
import { RoomProps } from "../context/reducers/roomsReducer";
import PackageJson from "../package.json";

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
}

interface ConnectProps {
  chatAuthId: string | undefined;
  tenantId: string;
  auth: {
    apiKey: string;
    subscriptionKey: string;
  };
}

export let socket: Socket<ServerToClientEvents, ClientToServerEvents>;

const project = {
  name: "React Native SDK",
  version: PackageJson.version,
};

export const connect = (props: ConnectProps) => {
  const { chatAuthId, tenantId, auth } = props;
  socket = io("https://service.commt.co", {
    query: { chatAuthId, tenantId, project },
    auth,
  });
};

export const sendMessage = (
  data: DataProps,
  callback: (status: string) => void,
) => {
  socket.emit(types.SEND_MESSAGE, data, ({ status }) => {
    callback(status);
  });
};

export const sendTypingStatus = (data: TypingProps) => {
  socket.emit(types.SEND_TYPING_STATUS, data);
};

export const sendReadToken = (data: ReadTokenProps) => {
  socket.emit(types.SEND_READ_TOKEN, data);
};

export const createNewRoom = (
  data: CreateRoomProps,
  callback: (room: RoomProps) => void,
) => {
  socket.emit(types.CREATE_NEW_ROOM, data, ({ room }) => {
    callback(room);
  });
};
