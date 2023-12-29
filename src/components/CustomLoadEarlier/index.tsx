import React, { useContext, useState } from "react";
import { styles } from "./styles";
import { LoadEarlierProps, LoadEarlier } from "react-native-gifted-chat";
import { useTheme } from "styled-components/native";
import { MessageActionProps } from "../../hooks/useSetMessages";
import { RoomProps } from "../../context/reducers/roomsReducer";
import { CommtContext } from "../../context/Context";
import gfMessageFormat from "../../utils/gfMessageFormat";
import { addMoreMessages } from "../../context/actions/messagesAction";

export type LoadMoreMessagesType = (props: {
  roomId: string;
  skip: number;
  limit: number;
}) => Promise<
  | {
      messages: MessageActionProps[];
      hasNext?: boolean;
    }
  | undefined
>;

interface CustomLoadEarlierProps extends LoadEarlierProps {
  activeRoom: RoomProps | undefined;
  loadMoreMessages: LoadMoreMessagesType;
}

const CustomLoadEarlier = ({
  activeRoom,
  loadMoreMessages,
}: CustomLoadEarlierProps) => {
  const {
    state: {
      messages,
      users: { users },
    },
    dispatch,
  } = useContext(CommtContext);

  const theme = useTheme();
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const limit = 10;

  const getEarlierMessages = async () => {
    // retrieve earlier messages
    const data = await loadMoreMessages({
      roomId: activeRoom!.roomId,
      skip: messages[activeRoom!.roomId].length,
      limit,
    });
    //  Check if data retrieval was successful
    if (data) {
      const { messages: messagesArray, hasNext } = data;
      setHasMore(hasNext ?? true);

      return gfMessageFormat({
        users,
        isGroupChat: activeRoom?.groupName ? true : false,
        messages: messagesArray,
      });
    }
    return [];
  };

  const onLoadEarlier = async () => {
    setIsLoading(true);
    // if there are more messages start request
    if (hasMore) {
      const messageArr = await getEarlierMessages();
      //add earlier messages to context
      addMoreMessages({ roomId: activeRoom!.roomId, messages: messageArr })(
        dispatch,
      );
    }
    setIsLoading(false);
  };

  if (hasMore) {
    return (
      <LoadEarlier
        onLoadEarlier={onLoadEarlier}
        wrapperStyle={styles(theme).wrapperStyle}
        textStyle={styles(theme).textStyle}
        activityIndicatorSize={"small"}
        activityIndicatorColor={theme?.colors.ui.ui3}
        isLoadingEarlier={isLoading}
        label="Load More"
      />
    );
  }

  return null;
};

export default CustomLoadEarlier;
