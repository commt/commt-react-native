import React, { useContext, useEffect, useState } from "react";
import { TypingContainer } from "./styles";
import { CommtContext } from "../../context/Context";
import TypingIndicator from "react-native-gifted-chat/lib/TypingIndicator";
import Avatar from "../Avatar";

interface ChatFooterProps {
  chatRoomAuthId: string;
}

interface TypingUsersProps {
  [userId: string]: boolean;
}

const ChatFooter = ({ chatRoomAuthId }: ChatFooterProps) => {
  const {
    state: {
      users: { users },
      rooms,
      typingUsers,
    },
  } = useContext(CommtContext);

  // Create a separate isTyping state for each user
  const [usersIsTyping, setUsersIsTyping] = useState<TypingUsersProps>({});
  const isCommunityChat = !!rooms.find(
    (room) => room.chatRoomAuthId === chatRoomAuthId,
  )?.groupAvatar;

  useEffect(() => {
    const newIsTyping = typingUsers[chatRoomAuthId]?.reduce(
      (status, userId) => {
        status[String(userId)] = true;
        return status;
      },
      {} as TypingUsersProps,
    );

    setUsersIsTyping(newIsTyping);
  }, [typingUsers]);

  return (
    <>
      {typingUsers[chatRoomAuthId]?.map((userId) => {
        const user = users.find(({ _id }) => _id === userId);
        return (
          user && (
            <TypingContainer key={user._id} isCommunityChat={isCommunityChat}>
              {isCommunityChat && (
                <Avatar
                  uri={user.avatar}
                  online={false}
                  height={30}
                  width={30}
                />
              )}
              <TypingIndicator isTyping={usersIsTyping?.[user._id]} />
            </TypingContainer>
          )
        );
      })}
    </>
  );
};

export default ChatFooter;
