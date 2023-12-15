import { useContext } from "react";
import { IMessage } from "react-native-gifted-chat";
import forge from "node-forge";
import { sendMessage } from "../utils/socket";
import { CommtContext } from "../context/Context";
import { addMessage } from "../context/actions/messagesAction";
import { updateLastMessage } from "../context/actions/roomsActions";
import { aesEncrypt, rsaEncrypt } from "../utils/encryption";

interface onSendMessageProps {
  message: IMessage;
  roomId: string;
  chatRoomAuthId: string;
}

const useSendMessage = () => {
  const {
    state: {
      users: { selfUser, users },
      rooms,
      app: {
        configs: { secretKey, apiKey, subscriptionKey, projectName, e2e },
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

    let encryptedMessage = messageContent.text;

    // Encrypt message with RSA; If the tenant enabled E2E encryption and it's not a system message
    if (e2e && !message.system) {
      const room = rooms.find((room) => room.roomId === roomId);

      // Find the opposing user ID among one-to-one room participants
      const oppositeUserId = room?.groupName
        ? null
        : room?.participants.find(
            (id) => id !== selfUser?._id && !id.startsWith("system"),
          );

      const oppositeUserPck = users.find((user) => user._id === oppositeUserId)
        ?.publicKey;

      // If the opposite user has a public key, the message text is encrypted using RSA.
      if (oppositeUserPck) {
        encryptedMessage = rsaEncrypt({
          message: encryptedMessage,
          publicKey: oppositeUserPck,
        });
      }
    }

    // AES encryption is the standard encryption method and encrypts every messages. It encrypts data by generating IV.
    const iv = forge.random.getBytesSync(16);
    encryptedMessage = aesEncrypt({
      key: secretKey,
      iv,
      messageData: JSON.stringify({
        message: { ...messageContent, text: encryptedMessage },
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
