import { InitiateProps, initiate } from "../service";

import { useCallback, useContext, useEffect, useState } from "react";
import { CommtContext } from "../context/Context";
import { ConfigsProps } from "../context/reducers/appReducer";
import { setConfigs } from "../context/actions/appActions";

const useInitiate = (props: InitiateProps) => {
  const { dispatch } = useContext(CommtContext);
  const [client, setClient] = useState<ConfigsProps | undefined>();

  const initialize = useCallback(async () => {
    const result = await initiate(props);

    setClient(result);
    // Dispatch result of the initiate function
    if (result !== undefined) {
      setConfigs({ ...result, ...props })(dispatch);
    }

    // TODO: Logger add log error"
  }, [props]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return client ?? {};
};

export default useInitiate;
