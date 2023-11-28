import { UserProps } from "../context/reducers/usersReducer";
import axios from "./Axios";
import { ConfigsProps } from "../context/reducers/appReducer";
import { RoomProps } from "../context/reducers/roomsReducer";

interface AuthKeysProps {
  apiKey: string;
  subscriptionKey: string;
}

export interface InitiateProps extends AuthKeysProps {
  tenantId: string;
}

interface OnlineInfoProps extends AuthKeysProps {
  userIds: string;
}

type OnlineInfoReturnProps = Pick<
  UserProps,
  "chatAuthId" | "socketId" | "online"
>;

interface ReadTokenProps extends AuthKeysProps {
  roomIds: string;
}

type ReadTokenReturnProps = Pick<
  RoomProps,
  "chatRoomAuthId" | "lastMessageReadToken"
>;

export const initiate = async (props: InitiateProps) => {
  const { tenantId, apiKey, subscriptionKey } = props;

  try {
    const response = await axios.get<ConfigsProps>(
      `/api/v1/tenant/config/${tenantId}`,
      {
        params: {
          tenantId,
          plugin: true, // This is for backend compatibility
        },
        headers: {
          apiKey,
          subscriptionKey,
        },
      },
    );

    if (response.data.tenantId === tenantId) {
      return response.data;
    }

    return;
  } catch {
    // TODO: Log error
    /* empty */
  }
};

export const getUsersOnlineInfo = async (props: OnlineInfoProps) => {
  const { userIds, apiKey, subscriptionKey } = props;

  try {
    const response = await axios.get<OnlineInfoReturnProps[]>(
      `/api/v1/user/active-users`,
      {
        params: {
          userIds,
        },
        headers: {
          apiKey,
          subscriptionKey,
        },
      },
    );

    return response.data;
  } catch {
    // TODO: Log error
    /* empty */
  }
};

export const getRoomsReadToken = async (props: ReadTokenProps) => {
  const { roomIds, apiKey, subscriptionKey } = props;

  try {
    const response = await axios.get<ReadTokenReturnProps[]>(
      `/api/v1/room/active-rooms`,
      {
        params: {
          roomIds,
        },
        headers: {
          apiKey,
          subscriptionKey,
        },
      },
    );

    return response.data;
  } catch {
    // TODO: Log error
    /* empty */
  }
};
