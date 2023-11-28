import { Dispatch } from "react";
import { RoomProps } from "../reducers/roomsReducer";
import { CommtContextActions } from "../reducers";
import { ICustomMessage } from "../reducers/messagesReducer";
import { ReadTokenProps } from "../../utils/socket";

export interface UpdateLastMessageProps {
  roomId: string;
  lastMessage: ICustomMessage;
}

export interface UpdateUnreadMsgCountProps {
  roomId: string;
  count: number;
}

export const setRooms =
  (rooms: RoomProps[]) => (dispatch: Dispatch<CommtContextActions>) => {
    dispatch({ type: "SET_ROOMS", payload: rooms });
  };

export const addRoom =
  (room: RoomProps) => (dispatch: Dispatch<CommtContextActions>) => {
    dispatch({ type: "ADD_ROOM", payload: room });
  };

export const updateLastMessage =
  (data: UpdateLastMessageProps) =>
  (dispatch: Dispatch<CommtContextActions>) => {
    dispatch({ type: "UPDATE_LAST_MESSAGE", payload: data });
  };

export const updateReadToken =
  (data: ReadTokenProps) => (dispatch: Dispatch<CommtContextActions>) => {
    dispatch({ type: "UPDATE_READ_TOKEN", payload: data });
  };

export const updateUnreadMsgCount =
  (data: UpdateUnreadMsgCountProps) =>
  (dispatch: Dispatch<CommtContextActions>) => {
    dispatch({ type: "UPDATE_UNREAD_MSG_COUNT", payload: data });
  };
