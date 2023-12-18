import { CommtContextActions } from ".";
import { ICustomMessage } from "./messagesReducer";

export type RoomProps = {
  participants: string[];
  roomId: string;
  chatRoomAuthId: string;
  groupName?: string; // just community chat
  groupAvatar?: string; // just community chat
  lastMessage?: ICustomMessage;
  unReadMessageCount: number;
  lastMessageReadToken: number; //This field represents the last time the receiver user read the message. The format of this field is number although using the numeric format of the time value using the getTime function to keep this value up to date.
};

export function roomsReducer(state: RoomProps[], action: CommtContextActions) {
  switch (action.type) {
    case "SET_ROOMS": {
      return action.payload;
    }

    case "ADD_ROOM": {
      return [...state, action.payload];
    }

    case "DELETE_ROOM": {
      const rooms = [...state];
      const roomIndexToBeDeleted = rooms.findIndex(
        (r) => r.chatRoomAuthId === action.payload,
      ); // action.payload represents the chatRoomAuthId of the room to be deleted from the state
      rooms.splice(roomIndexToBeDeleted, 1); // Delete that particular index from the instance of the rooms

      return rooms;
    }

    case "UPDATE_LAST_MESSAGE": {
      const { roomId, lastMessage } = action.payload;
      return state.map((room) =>
        room.roomId === roomId ? { ...room, lastMessage } : room,
      );
    }

    case "UPDATE_READ_TOKEN": {
      const { chatRoomAuthId, token } = action.payload;
      return state.map((room) => {
        if (room.chatRoomAuthId === chatRoomAuthId) {
          return {
            ...room,
            lastMessageReadToken: token,
          };
        }
        return room;
      });
    }

    case "UPDATE_UNREAD_MSG_COUNT": {
      const { roomId, count } = action.payload;
      return state.map((room) => {
        if (room.roomId === roomId) {
          return { ...room, unReadMessageCount: count };
        }
        return room;
      });
    }

    default: {
      return state;
    }
  }
}
