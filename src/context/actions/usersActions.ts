import { Dispatch } from "react";
import { UserProps } from "../reducers/usersReducer";
import { CommtContextActions } from "../reducers";

export interface UpdateOnlineProps {
  chatAuthId: string;
  online: boolean;
}

export const setUsers =
  (users: UserProps[]) => (dispatch: Dispatch<CommtContextActions>) => {
    dispatch({ type: "SET_USERS", payload: users });
  };

export const setSelfUser =
  (user: UserProps) => (dispatch: Dispatch<CommtContextActions>) => {
    dispatch({ type: "SET_SELFUSER", payload: user });
  };

export const updateUserOnline =
  (data: UpdateOnlineProps) => (dispatch: Dispatch<CommtContextActions>) => {
    dispatch({ type: "UPDATE_USER_ONLINE", payload: data });
  };
