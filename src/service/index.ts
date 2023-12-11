import { UserProps } from "../context/reducers/usersReducer";
import axios from "./Axios";
import { ConfigsProps } from "../context/reducers/appReducer";
import { RoomProps } from "../context/reducers/roomsReducer";
import PackageJson from "../../package.json";

export interface InitiateProps {
  apiKey: string;
  subscriptionKey: string;
}

interface OnlineInfoProps extends InitiateProps {
  userIds: string;
}

type OnlineInfoReturnProps = Pick<
  UserProps,
  "chatAuthId" | "socketId" | "online"
>;

interface ReadTokenProps extends InitiateProps {
  roomIds: string;
}

type ReadTokenReturnProps = Pick<
  RoomProps,
  "chatRoomAuthId" | "lastMessageReadToken"
>;

const project = {
  name: "React Native SDK",
  version: PackageJson.version,
};

export const initiate = async (props: InitiateProps) => {
  const { apiKey, subscriptionKey } = props;

  try {
    const response = await axios.get<ConfigsProps>(`/api/v1/tenant/config/`, {
      params: {
        plugin: true, // This is for backend compatibility
        project: project.name, // This is for backend compatibility & analytics
        version: project.version, // This is for backend compatibility & analytics
      },
      headers: {
        apiKey,
        subscriptionKey,
      },
    });

    if (response.data.tenantId) {
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
