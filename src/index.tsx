import React, { ComponentType } from "react";
import { CommtContextProvider } from "./context/Context";

const CommtProvider = (OriginalComponent: ComponentType) => {
  return (props: any) => (
    <CommtContextProvider>
      <OriginalComponent {...props} />
    </CommtContextProvider>
  );
};

export default CommtProvider;
