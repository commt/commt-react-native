import React, { useState, useEffect, useContext, useRef } from "react";
import { styles, Container } from "./styles";
import { CommtContext } from "../../context/Context";
import { ICustomMessage } from "../../context/reducers/messagesReducer";
import { useTheme } from "styled-components/native";
import { BubbleProps, GiftedChat, IMessage } from "react-native-gifted-chat";
import { EmojiType } from "rn-emoji-keyboard/lib/typescript/src/types";
import { EmojiKeyboard } from "rn-emoji-keyboard";
import CustomUsernameView from "../CustomUsernameView";
import CustomBubble from "../CustomBubble";
import useSendMessage from "../../hooks/useSendMessage";
import CustomInputToolbar from "../CustomInputToolBar";
import SendButton from "../SendButton";
import CustomComposer from "../CustomComposer";
import EmojiButton from "../EmojiButton";
import Dates from "../Dates";
import CustomAvatar from "../CustomAvatar";
import ChatFooter from "../ChatFooter";
import CustomSystemMessage from "../CustomSystemMessage";
import CustomLoadEarlier, { LoadMoreMessagesType } from "../CustomLoadEarlier";
import {
  createNewRoom,
  sendReadToken,
  sendTypingStatus,
} from "../../utils/socket";
import dayjs from "dayjs";
import { IndicatorProps } from "../../context/reducers/appReducer";
import { RoomProps } from "../../context/reducers/roomsReducer";
import { addRoom } from "../../context/actions/roomsActions";

interface ChatProps {
  roomId?: string;
  generateRoomAction?: () => RoomProps;
  participants?: Array<string>;
  loadMoreMessages: LoadMoreMessagesType;
}

const Chat = ({
  roomId,
  generateRoomAction,
  participants,
  loadMoreMessages,
}: ChatProps) => {
  const {
    state: {
      users: { selfUser, users },
      rooms,
      messages,
      app: {
        configs: { indicators, tenantId, apiKey, projectId },
      },
    },
    dispatch,
  } = useContext(CommtContext);

  const [customText, setCustomText] = useState<string>("");
  const [isEmojiOpen, setIsEmojiOpen] = useState<boolean>(false);
  const isAlreadyTypingRef = useRef<boolean>(false);
  const theme = useTheme();
  const onSendMessage = useSendMessage();
  const [activeRoom, setActiveRoom] = useState(
    rooms.find((room) => room.roomId === roomId),
  );

  useEffect(() => {
    // if opposite user create new room, update active room
    if (!activeRoom && !roomId && participants) {
      const newRoom = rooms.find((room) => {
        return participants.every((id) => room.participants.includes(id));
      });
      newRoom && setActiveRoom(newRoom);
    }
  }, [rooms]);

  useEffect(() => {
    if (roomId) {
      setActiveRoom(rooms.find((room) => room.roomId === roomId));
    }
  }, [rooms, roomId]);

  useEffect(() => {
    // Check for configs in current development env and render the elements depends on the configuration limits
    if (
      indicators.includes(IndicatorProps.MESSAGE_READ) && // Check if the last message belongs the opposite user
      activeRoom &&
      activeRoom?.lastMessage?.user?._id !== selfUser?._id
    ) {
      // Update the room's lastMessageReadToken field
      sendReadToken(
        {
          token: dayjs().valueOf(),
          chatRoomAuthId: activeRoom.chatRoomAuthId,
        },
        //handle Log params
        {
          apiKey,
          projectId,
          chatAuthId: selfUser!.chatAuthId,
        },
      );
    }
  }, [indicators, activeRoom?.lastMessage]);

  const typingStatus = (isTyping: boolean) => {
    selfUser &&
      activeRoom &&
      sendTypingStatus(
        {
          isTyping,
          userId: selfUser._id,
          chatRoomAuthId: activeRoom.chatRoomAuthId,
        },
        //handle Log params
        {
          apiKey,
          projectId,
          chatAuthId: selfUser!.chatAuthId,
        },
      );
    isAlreadyTypingRef.current = isTyping;
  };

  useEffect(() => {
    // Check for configs in current development env and render the elements depends on the configuration limits
    if (indicators.includes(IndicatorProps.TYPING)) {
      if (customText && !isAlreadyTypingRef.current) {
        // run isTyping true
        typingStatus(true);
      } else if (!customText && isAlreadyTypingRef.current) {
        // run isTyping false
        typingStatus(false);
      }
    }
  }, [indicators, customText]);

  useEffect(() => {
    return () => {
      if (indicators.includes(IndicatorProps.TYPING)) {
        isAlreadyTypingRef.current && typingStatus(false);
      }
    };
  }, []);

  const handleEmojiPick = (emojiObject: EmojiType) => {
    setCustomText((prevText) => prevText + emojiObject.emoji);
  };

  const onFocusHandler = () => {
    setIsEmojiOpen(false);
  };

  const renderChatFooter = () => {
    if (indicators.includes(IndicatorProps.TYPING)) {
      return <ChatFooter chatRoomAuthId={activeRoom!.chatRoomAuthId} />;
    }
  };

  // TODO: Refactor sendMessage and onSend for better code flow
  /* 
  The current situation:
  - createNewRoom event takes time to create a room.
  - sendMessage is a temporary workaround to handle message sending.
  
  Why this situation exists:
  - onSendMessage needs to be triggered after the room is created.

  How it can be resolved:
  - After the room creation is complete in onSend,
  - trigger onSendMessage to send the message.
  */
  const sendMessage = (message: IMessage[], room: RoomProps) => {
    onSendMessage({
      message: message[0],
      roomId: room.roomId,
      chatRoomAuthId: room.chatRoomAuthId,
    });
  };

  const onSend = (message: IMessage[]) => {
    // Check if a new room needs to be created
    if (!roomId && !activeRoom?.roomId) {
      if (generateRoomAction) {
        const newRoom = generateRoomAction();
        setActiveRoom(newRoom);
        addRoom(newRoom)(dispatch);
        sendMessage(message, newRoom);
      } else {
        const chatAuthIds = users
          .filter((user) => participants?.includes(user._id))
          .map((user) => user.chatAuthId);

        const data = {
          participants: participants!,
          chatAuthIds,
          selfUserChatAuthId: selfUser!.chatAuthId,
          tenantId,
        };
        // Create new room with socket event
        createNewRoom(
          data,
          (room) => {
            setActiveRoom(room);
            addRoom(room)(dispatch);
            sendMessage(message, room);
          },
          //handle Log params
          {
            apiKey,
            projectId,
            chatAuthId: selfUser!.chatAuthId,
          },
        );
      }
    } else {
      // if room exist send message
      sendMessage(message, activeRoom!);
    }
  };

  return (
    <Container>
      <GiftedChat
        messages={
          activeRoom && messages[activeRoom.roomId]
            ? messages[activeRoom.roomId]
            : []
        }
        user={selfUser ? { _id: selfUser._id } : undefined}
        text={customText}
        onInputTextChanged={setCustomText}
        onSend={onSend}
        renderInputToolbar={CustomInputToolbar}
        renderSend={SendButton}
        renderComposer={CustomComposer}
        renderActions={(props) => (
          <EmojiButton {...props} setIsEmojiOpen={setIsEmojiOpen} />
        )}
        renderDay={Dates}
        renderBubble={(props: BubbleProps<ICustomMessage>) => (
          <CustomBubble {...props} activeRoom={activeRoom} />
        )}
        renderCustomView={(props: BubbleProps<ICustomMessage>) => (
          <CustomUsernameView {...props} activeRoom={activeRoom} />
        )}
        renderAvatar={(props) =>
          activeRoom?.groupAvatar && (
            <CustomAvatar {...props} activeRoom={activeRoom} />
          )
        }
        renderAvatarOnTop={true}
        renderChatFooter={renderChatFooter}
        renderSystemMessage={CustomSystemMessage}
        showAvatarForEveryMessage={true}
        messagesContainerStyle={styles(theme).messageContainerStyle}
        maxComposerHeight={60}
        textInputProps={{ onFocus: onFocusHandler }}
        shouldUpdateMessage={() =>
          indicators.includes(IndicatorProps.MESSAGE_READ) &&
          !!activeRoom?.lastMessageReadToken
        }
        infiniteScroll={true}
        alignTop={true}
        loadEarlier={true}
        renderLoadEarlier={(props) => (
          <CustomLoadEarlier
            {...props}
            activeRoom={activeRoom}
            loadMoreMessages={loadMoreMessages}
          />
        )}
      />
      {isEmojiOpen && (
        <EmojiKeyboard
          onEmojiSelected={handleEmojiPick}
          allowMultipleSelections
          enableSearchBar
          categoryPosition={"bottom"}
          theme={styles(theme).emojiKeyboardStyle}
        />
      )}
    </Container>
  );
};

export default Chat;
