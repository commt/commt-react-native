import { useContext } from "react";
import { CommtContext } from "../context/Context";
import { setRooms } from "../context/actions/roomsActions";
import { RoomProps } from "../context/reducers/roomsReducer";
import { getRoomsReadToken } from "../service";
import { IndicatorProps } from "../context/reducers/appReducer";

const useSetRooms = () => {
  const {
    state: {
      users: { selfUser },
      app: {
        configs: { apiKey, indicators, projectId },
      },
    },
    dispatch,
  } = useContext(CommtContext);

  const setRoomsAction = async (rooms: RoomProps[]) => {
    if (indicators.includes(IndicatorProps.MESSAGE_READ)) {
      const activeRooms = await getRoomsReadToken({
        roomIds: rooms.map((room) => room.chatRoomAuthId).join(","),
        apiKey,
        projectId,
        chatAuthId: selfUser!.chatAuthId,
      });

      // Match the 'lastMessageReadToken' field for active rooms from the service data
      activeRooms?.length &&
        rooms.map((room) => {
          const matchedRoom = activeRooms.find(
            ({ chatRoomAuthId }) => chatRoomAuthId === room.chatRoomAuthId,
          );

          if (matchedRoom) {
            room.lastMessageReadToken = matchedRoom.lastMessageReadToken;
          }
        });
    }

    setRooms(rooms)(dispatch);
  };

  return setRoomsAction;
};

export default useSetRooms;
