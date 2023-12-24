import { UserProps } from "../context/reducers/usersReducer";
import axios from "./Axios";
import { ConfigsProps } from "../context/reducers/appReducer";
import { RoomProps } from "../context/reducers/roomsReducer";
import PackageJson from "../package.json";
import * as events from "../utils/events";

export interface InitiateProps {
  apiKey: string;
  projectId: string;
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
  SDK: "React Native SDK",
  version: PackageJson.version,
};

export const initiate = async (props: InitiateProps) => {
  const { apiKey, projectId } = props;

  try {
    const response = await axios.get<ConfigsProps>(`/api/v1/project/config/`, {
      params: {
        SDK: project.SDK, // This is for backend compatibility & analytics
        version: project.version, // This is for backend compatibility & analytics
        projectId, // This is for backend compatibility & analytics
      },
      headers: {
        apiKey,
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
      projectId,
      error: {
        error,
        event: events.INITIATE_TENANT_CONFIGS,
      },
    });
  }
};

export const getUsersOnlineInfo = async (props: OnlineInfoProps) => {
  const { userIds, apiKey, projectId, chatAuthId } = props;

  try {
    const response = await axios.get<OnlineInfoReturnProps[]>(
      `/api/v1/user/active-users`,
      {
        params: {
          userIds,
        },
        headers: {
          apiKey,
        },
      },
    );

    return response.data;
  } catch (error) {
    // Log error to service
    handleLogger({
      apiKey,
      projectId,
      error: {
        error,
        event: events.GET_USERS_ONLINE_INFO,
      },
      chatAuthId,
    });
  }
};

export const getRoomsReadToken = async (props: ReadTokenProps) => {
  const { roomIds, apiKey, projectId, chatAuthId } = props;

  try {
    const response = await axios.get<ReadTokenReturnProps[]>(
      `/api/v1/room/active-rooms`,
      {
        params: {
          roomIds,
        },
        headers: {
          apiKey,
        },
      },
    );
    return response.data;
  } catch (error) {
    // TODO: Log error
    handleLogger({
      apiKey,
      projectId,
      error: {
        error,
        event: events.GET_ROOMS_READ_TOKEN,
      },
      chatAuthId,
    });
  }
};

export const handleLogger = async (props: HandleLoggerProps) => {
  const { apiKey, projectId, error, chatAuthId, chatRoomAuthId } = props;

  const logObject = {
    projectId,
    SDK: project.SDK,
    version: project.version,
    error,
    ...(chatAuthId && { chatAuthId }),
    ...(chatRoomAuthId && { chatRoomAuthId }),
  };

  try {
    axios.post("/system/logger", logObject, {
      headers: {
        apiKey,
      },
    });
  } catch (error_) {
    // Log error
    console.log("handle Logger failed", error_);
  }
};
