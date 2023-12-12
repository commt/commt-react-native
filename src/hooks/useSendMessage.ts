import { useContext } from "react";
import { IMessage } from "react-native-gifted-chat";
import { sendMessage } from "../utils/socket";
import { CommtContext } from "../context/Context";
import { addMessage } from "../context/actions/messagesAction";
import { updateLastMessage } from "../context/actions/roomsActions";
import forge from "node-forge";
import { aesEncrypt } from "../utils/encryption";

interface onSendMessageProps {
  message: IMessage;
  roomId: string;
  chatRoomAuthId: string;
}

const useSendMessage = () => {
  const {
    state: {
      users: { selfUser },
      app: {
        configs: { secretKey, apiKey, subscriptionKey, projectName },
      },
    },
    dispatch,
  } = useContext(CommtContext);

  const onSendMessage = (props: onSendMessageProps) => {
    const { message, roomId, chatRoomAuthId } = props;
    const messageContent = {
      ...message,
      type: "text",
      senderId: message.user._id,
    };

    // create iv and encrypt data for each message
    const iv = forge.random.getBytesSync(16);
    const encryptedMessage = aesEncrypt({
      key: secretKey,
      iv,
      messageData: JSON.stringify({
        message: messageContent,
        roomId,
        chatRoomAuthId,
      }),
    });

    sendMessage(
      {
        message: encryptedMessage,
        iv: forge.util.bytesToHex(iv),
      },
      (status) => {
        // If the message sending succesfully
        if (status === "success") {
          // add the message to context
          addMessage({ message: messageContent, roomId: roomId })(dispatch);

          updateLastMessage({
            lastMessage: messageContent,
            roomId: roomId,
          })(dispatch);
        }
      },
      //handle Log params
      {
        apiKey,
        subscriptionKey,
        projectName,
        chatAuthId: selfUser!.chatAuthId,
        chatRoomAuthId,
      },
    );
  };

  return onSendMessage;
};

export default useSendMessage;
