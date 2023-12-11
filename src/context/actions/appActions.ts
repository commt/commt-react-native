import { Dispatch } from "react";
import { CommtContextActions } from "../reducers";
import { DefaultTheme } from "styled-components/native";
import { ConfigsProps } from "../reducers/appReducer";

export const toggleTheme =
  (themeType: DefaultTheme) => (dispatch: Dispatch<CommtContextActions>) => {
    dispatch({ type: "TOGGLE_THEME", payload: themeType });
  };

export const setSearchValue =
  (searchValue: string) => (dispatch: Dispatch<CommtContextActions>) => {
    dispatch({ type: "SET_SEARCH_VALUE", payload: searchValue });
  };

export const setConfigs =
  (configsData: ConfigsProps) => (dispatch: Dispatch<CommtContextActions>) => {
    dispatch({ type: "SET_CONFIGS", payload: configsData });
  };
