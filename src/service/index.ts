import { UserProps } from "../context/reducers/usersReducer";
import axios from "./Axios";
import { ConfigsProps } from "../context/reducers/appReducer";
import { RoomProps } from "../context/reducers/roomsReducer";
import PackageJson from "../../package.json";
import * as events from "../utils/events";

export interface InitiateProps {
  apiKey: string;
  subscriptionKey: string;
  projectName: string;
}

interface OnlineInfoProps extends InitiateProps {
  userIds: string;
  chatAuthId: string; // for selfUser's chatAuthId
}

type OnlineInfoReturnProps = Pick<
  UserProps,
  "chatAuthId" | "socketId" | "online"
>;

interface ReadTokenProps extends InitiateProps {
  roomIds: string;
  chatAuthId: string; //selfUser's chatAuthId
}

type ReadTokenReturnProps = Pick<
  RoomProps,
  "chatRoomAuthId" | "lastMessageReadToken"
>;

interface HandleLoggerProps extends InitiateProps {
  error: {
    error: Error | string | { [key: string]: any } | unknown;
    event: string;
  };
  chatAuthId?: string;
  chatRoomAuthId?: string;
}

const project = {
  name: "React Native SDK",
  version: PackageJson.version,
};

export const initiate = async (props: InitiateProps) => {
  const { apiKey, subscriptionKey, projectName } = props;

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
  } catch (error) {
    // Log error to service
    handleLogger({
      apiKey,
      subscriptionKey,
      projectName,
      error: {
        error,
        event: events.INITIATE_TENANT_CONFIGS,
      },
    });
  }
};

export const getUsersOnlineInfo = async (props: OnlineInfoProps) => {
  const { userIds, apiKey, subscriptionKey, projectName, chatAuthId } = props;

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
  } catch (error) {
    // Log error to service
    handleLogger({
      apiKey,
      subscriptionKey,
      projectName,
      error: {
        error,
        event: events.GET_USERS_ONLINE_INFO,
      },
      chatAuthId,
    });
  }
};

export const getRoomsReadToken = async (props: ReadTokenProps) => {
  const { roomIds, apiKey, subscriptionKey, projectName, chatAuthId } = props;

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
  } catch (error) {
    // TODO: Log error
    handleLogger({
      apiKey,
      subscriptionKey,
      projectName,
      error: {
        error,
        event: events.GET_ROOMS_READ_TOKEN,
      },
      chatAuthId,
    });
  }
};

export const handleLogger = async (props: HandleLoggerProps) => {
  const {
    apiKey,
    subscriptionKey,
    projectName,
    error,
    chatAuthId,
    chatRoomAuthId,
  } = props;

  const logObject = {
    projectName,
    SDK: project.name,
    version: project.version,
    error,
    ...(chatAuthId && { chatAuthId }),
    ...(chatRoomAuthId && { chatRoomAuthId }),
  };

  try {
    axios.post("/system/logger", logObject, {
      headers: {
        apiKey,
        subscriptionKey,
      },
    });
  } catch (error_) {
    // Log error
    console.log("handle Logger failed", error_);
  }
};
