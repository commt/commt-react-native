import {
  usersReducer,
  InitialState as UserValues,
  UserProps,
  UserState,
} from "./usersReducer";
import { roomsReducer, RoomProps } from "./roomsReducer";
import { messagesReducer, IMessagesData } from "./messagesReducer";
import { AppState, AppValues, ConfigsProps, appReducer } from "./appReducer";
import { DefaultTheme } from "styled-components/native";
import { UpdateOnlineProps } from "../actions/usersActions";
import {
  AddMessageProps,
  AddMoreMessagesProps,
} from "../actions/messagesAction";
import {
  UpdateLastMessageProps,
  UpdateUnreadMsgCountProps,
} from "../actions/roomsActions";
import { ReadTokenProps, TypingProps } from "../../utils/socket";
import { TypingUsersProps, typingUsersReducer } from "./typingUsersReducer";

export interface CommtContextData {
  users: UserState;
  rooms: RoomProps[];
  messages: IMessagesData;
  typingUsers: TypingUsersProps;
  app: AppState;
}

export const InitialState: CommtContextData = {
  users: UserValues,
  rooms: [],
  messages: {},
  typingUsers: {},
  app: AppValues,
};

type RoomsActions =
  | { type: "SET_ROOMS"; payload: RoomProps[] }
  | { type: "ADD_ROOM"; payload: RoomProps }
  | { type: "UPDATE_LAST_MESSAGE"; payload: UpdateLastMessageProps }
  | { type: "UPDATE_READ_TOKEN"; payload: ReadTokenProps }
  | { type: "UPDATE_UNREAD_MSG_COUNT"; payload: UpdateUnreadMsgCountProps };

type UsersActions =
  | { type: "SET_USERS"; payload: UserProps[] }
  | { type: "SET_SELFUSER"; payload: UserProps }
  | { type: "UPDATE_USER_ONLINE"; payload: UpdateOnlineProps };

type MessagesActions =
  | { type: "SET_MESSAGES"; payload: IMessagesData }
  | { type: "ADD_MESSAGE"; payload: AddMessageProps }
  | { type: "ADD_MORE_MESSAGES"; payload: AddMoreMessagesProps };

type AppActions =
  | { type: "TOGGLE_THEME"; payload: DefaultTheme }
  | { type: "SET_SEARCH_VALUE"; payload: string }
  | { type: "SET_CONFIGS"; payload: ConfigsProps };

type TypingUsersActions =
  | { type: "ADD_USER_ID"; payload: Omit<TypingProps, "isTyping"> }
  | { type: "DELETE_USER_ID"; payload: Omit<TypingProps, "isTyping"> };

// combine all actions
export type CommtContextActions =
  | UsersActions
  | RoomsActions
  | MessagesActions
  | TypingUsersActions
  | AppActions;

// combine all reducers
export const rootReducer = (
  { users, rooms, messages, typingUsers, app }: CommtContextData,
  action: CommtContextActions,
) => ({
  users: usersReducer(users, action),
  rooms: roomsReducer(rooms, action),
  messages: messagesReducer(messages, action),
  typingUsers: typingUsersReducer(typingUsers, action),
  app: appReducer(app, action),
});
