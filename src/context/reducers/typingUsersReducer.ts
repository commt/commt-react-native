import { CommtContextActions } from ".";

export type TypingUsersProps = {
  [roomId: string]: Array<string>; // The array contains typing the user IDs
};

export function typingUsersReducer(
  state: TypingUsersProps,
  action: CommtContextActions,
) {
  switch (action.type) {
    case "ADD_USER_ID": {
      const { chatRoomAuthId, userId } = action.payload;
      const roomTypingUsers = state[chatRoomAuthId] ?? [];

      if (!roomTypingUsers.includes(userId)) {
        return {
          ...state,
          [chatRoomAuthId]: [...roomTypingUsers, userId],
        };
      }
      return state;
    }

    case "DELETE_USER_ID": {
      const { chatRoomAuthId, userId } = action.payload;
      const roomTypingUsers = state[chatRoomAuthId];
      const indexToRemove = roomTypingUsers?.findIndex((id) => id === userId);

      if (roomTypingUsers && indexToRemove !== -1) {
        roomTypingUsers.splice(indexToRemove, 1);
        return {
          ...state,
          [chatRoomAuthId]: roomTypingUsers,
        };
      }
      return state;
    }

    default: {
      return state;
    }
  }
}
