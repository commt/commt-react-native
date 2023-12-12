import { CommtContextActions } from ".";

export type UserProps = {
  _id: string;
  chatAuthId: string;
  username: string;
  avatar?: string;
  online: boolean;
  socketId?: string | undefined;
  privateKey?: string;
  publicKey?: string;
};

export type UserState = {
  selfUser: UserProps | null;
  users: UserProps[];
};

export const InitialState: UserState = {
  users: [],
  selfUser: null,
};

export function usersReducer(
  state = InitialState,
  action: CommtContextActions,
) {
  switch (action.type) {
    case "SET_USERS": {
      return { ...state, users: action.payload };
    }

    case "SET_SELFUSER": {
      return { ...state, selfUser: action.payload };
    }

    case "UPDATE_USER_ONLINE": {
      const { chatAuthId, online } = action.payload;
      const foundIndex = state.users.findIndex(
        (user) => user.chatAuthId === chatAuthId,
      );
      if (foundIndex !== -1) {
        const users = [...state.users];
        users[foundIndex] = {
          ...users[foundIndex],
          online,
        };
        return { ...state, users };
      }
      return state;
    }

    default: {
      return state;
    }
  }
}
