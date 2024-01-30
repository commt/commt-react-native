import { useContext, useState } from "react";
import { MessageActionProps } from "./useSetMessages";
import { RoomProps } from "../context/reducers/roomsReducer";
import { CommtContext } from "../context/Context";
import gfMessageFormat from "../utils/gfMessageFormat";
import { addMoreMessages } from "../context/actions/messagesAction";

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

interface LoadEarlierProps {
  activeRoom: RoomProps | undefined;
  loadMoreMessages: LoadMoreMessagesType;
}

const useLoadEarlier = ({ activeRoom, loadMoreMessages }: LoadEarlierProps) => {
  const {
    state: {
      messages,
      users: { users },
    },
    dispatch,
  } = useContext(CommtContext);

  const [hasMore, setHasMore] = useState(true);
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
    // if there are more messages start request
    if (hasMore) {
      const messageArr = await getEarlierMessages();
      //add earlier messages to context
      addMoreMessages({ roomId: activeRoom!.roomId, messages: messageArr })(
        dispatch,
      );
    }
  };

  return hasMore ? onLoadEarlier : undefined;
};

export default useLoadEarlier;
