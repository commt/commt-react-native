import React, { useContext } from "react";
import { CommtContext } from "../context/Context";
import { IndicatorProps } from "../context/reducers/appReducer";

const useTypingUsers = (chatRoomAuthId: string | null) => {
  const {
    state: {
      users: { users },
      typingUsers,
      app: {
        configs: { indicators },
      },
    },
  } = useContext(CommtContext);
  // Check for configs in current development env and render the elements depends on the configuration limits; if the typing enabled
  if (indicators.includes(IndicatorProps.TYPING) && chatRoomAuthId) {
    const roomTypingUsers = typingUsers?.[chatRoomAuthId];
    const typingUserNames = roomTypingUsers
      ? roomTypingUsers
          .map((userId) => users.find(({ _id }) => _id === userId)?.username)
          .join(", ")
      : null;

    return typingUserNames;
  }

  return null;
};

export default useTypingUsers;
