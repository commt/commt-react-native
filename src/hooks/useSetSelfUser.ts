import { useContext } from "react";
import { CommtContext } from "../context/Context";
import { setSelfUser } from "../context/actions/usersActions";
import { UserProps } from "../context/reducers/usersReducer";

const useSetSelfUser = () => {
  const { dispatch } = useContext(CommtContext);

  const setSelfUserAction = (selfUser: UserProps) => {
    setSelfUser(selfUser)(dispatch);
  };

  return setSelfUserAction;
};

export default useSetSelfUser;
