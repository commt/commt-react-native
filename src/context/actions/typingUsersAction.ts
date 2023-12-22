import { Dispatch } from "react";
import { TypingProps } from "../../utils/socket";
import { CommtContextActions } from "../reducers";

export const updateTypingUsers =
  (typingData: TypingProps) => (dispatch: Dispatch<CommtContextActions>) => {
    const { isTyping, ...IDsInfo } = typingData;
    const type = isTyping ? "ADD_USER_ID" : "DELETE_USER_ID";
    dispatch({ type, payload: IDsInfo });
  };
