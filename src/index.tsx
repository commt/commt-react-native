import React from "react";
import { CommtContextProvider } from "./context/Context";

const CommtProvider = (OriginalComponent: () => React.JSX.Element) => {
  return (props: any) => (
    <CommtContextProvider>
      <OriginalComponent {...props} />
    </CommtContextProvider>
  );
};

export default CommtProvider;
