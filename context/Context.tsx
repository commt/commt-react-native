import React, { FC, createContext, useReducer, Dispatch } from "react";
import {
  rootReducer,
  CommtContextActions,
  CommtContextData,
  InitialState,
} from "./reducers";
import SocketController from "../utils/SocketController";
import { ThemeProvider } from "styled-components";

// Create a new context
export const CommtContext = createContext<{
  state: CommtContextData;
  dispatch: Dispatch<CommtContextActions>;
}>({
  state: InitialState,
  dispatch: () => null,
});

interface CommtProviderProps {
  children: React.ReactNode;
}

// Define the context provider component
export const CommtContextProvider: FC<CommtProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, InitialState);

  return (
    <CommtContext.Provider value={{ state, dispatch }}>
      <ThemeProvider theme={state.app.theme}>
        {children}
        {state.users.selfUser && state.app.configs.tenantId && (
          <SocketController />
        )}
      </ThemeProvider>
    </CommtContext.Provider>
  );
};
