import { useContext } from "react";
import { CommtContext } from "../context/Context";
import { setUsers } from "../context/actions/usersActions";
import { UserProps } from "../context/reducers/usersReducer";
import { getUsersOnlineInfo } from "../service";
import { IndicatorProps } from "../context/reducers/appReducer";

const useSetUsers = () => {
  const {
    state: {
      users: { selfUser },
      app: {
        configs: { apiKey, subscriptionKey, indicators, projectName },
      },
    },
    dispatch,
  } = useContext(CommtContext);

  const setUsersAction = async (users: UserProps[]) => {
    if (indicators.includes(IndicatorProps.ONLINE)) {
      const userIds = users
        .filter(({ chatAuthId }) => selfUser?.chatAuthId !== chatAuthId)
        .map(({ chatAuthId }) => chatAuthId)
        .join(",");

      const activeUsers = await getUsersOnlineInfo({
        userIds,
        apiKey,
        subscriptionKey,
        projectName,
        chatAuthId: selfUser!.chatAuthId,
      });

      // Match the 'online' field for active users from the service data
      activeUsers?.length &&
        users.map((user) => {
          const matchedUser = activeUsers.find(
            ({ chatAuthId }) => chatAuthId === user.chatAuthId,
          );

          user.online = matchedUser ? matchedUser.online : false;
        });
    }

    setUsers(users)(dispatch);
  };

  return setUsersAction;
};

export default useSetUsers;
