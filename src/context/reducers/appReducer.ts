import { DefaultTheme } from "styled-components/native";
import { CommtContextActions } from ".";
import { LIGHT_THEME } from "../../theme";

export enum IndicatorProps {
  TYPING = "typing",
  ONLINE = "online",
  MESSAGE_READ = "message-read",
}

export type ConfigsProps = {
  e2e: boolean;
  fileSharing: boolean;
  indicators: IndicatorProps[];
  tenantId: string;
  apiKey: string;
  secretKey: string;
  projectId: string;
};

export type AppState = {
  theme: DefaultTheme;
  searchValue: string;
  configs: ConfigsProps;
};

export const AppValues: AppState = {
  theme: LIGHT_THEME,
  searchValue: "",
  configs: {
    e2e: false,
    fileSharing: false,
    indicators: [],
    tenantId: "",
    apiKey: "",
    secretKey: "",
    projectId: "",
  },
};

export function appReducer(state: AppState, action: CommtContextActions) {
  switch (action.type) {
    case "TOGGLE_THEME": {
      return { ...state, theme: { ...state.theme, colors: action.payload } };
    }

    case "SET_SEARCH_VALUE": {
      return { ...state, searchValue: action.payload };
    }

    case "SET_CONFIGS": {
      return { ...state, configs: action.payload };
    }

    default: {
      return state;
    }
  }
}
