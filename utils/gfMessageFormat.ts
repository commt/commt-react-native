import { ICustomMessage } from "../context/reducers/messagesReducer";
import { UserProps } from "../context/reducers/usersReducer";
import { MessageActionProps } from "../hooks/useSetMessages";

type Props = {
  messages: MessageActionProps[];
  users: UserProps[];
  isGroupChat: boolean;
};

export default ({ messages, users, isGroupChat }: Props): ICustomMessage[] => {
  const formattedMessages = messages.map((message) => {
    // find the owner of the message
    const user = isGroupChat && users.find(({ _id }) => _id === message.user);
    return {
      _id: message.id,
      text: message.text,
      createdAt: message.createdAt,
      type: message.type,
      senderId: message.user,
      user: {
        _id: message.user,
        ...(user ? { avatar: user.avatar } : {}),
        ...(user ? { name: user.username } : {}),
      },
    };
  });

  // return messages as gf chat message format
  return formattedMessages;
};
