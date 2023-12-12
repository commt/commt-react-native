import { Dispatch } from "react";
import { CommtContextActions } from "../reducers";
import {
  ICustomMessage,
  IMessagesData,
} from "../../context/reducers/messagesReducer";

export interface AddMessageProps {
  roomId: string;
  message: ICustomMessage;
}

export interface AddMoreMessagesProps {
  roomId: string;
  messages: ICustomMessage[];
}

export const setMessages =
  (messages: IMessagesData) => (dispatch: Dispatch<CommtContextActions>) => {
    dispatch({ type: "SET_MESSAGES", payload: messages });
  };

export const addMessage =
  (data: AddMessageProps) => (dispatch: Dispatch<CommtContextActions>) => {
    dispatch({ type: "ADD_MESSAGE", payload: data });
  };

export const addMoreMessages =
  (data: AddMoreMessagesProps) => (dispatch: Dispatch<CommtContextActions>) => {
    dispatch({ type: "ADD_MORE_MESSAGES", payload: data });
  };
