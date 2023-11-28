import { useContext } from "react";
import { CommtContext } from "../context/Context";
import { toggleTheme } from "../context/actions/appActions";
import { DefaultTheme } from "styled-components/native";

const useToggleTheme = () => {
  const { dispatch } = useContext(CommtContext);

  const toggleThemeAction = (themeValue: DefaultTheme) => {
    toggleTheme(themeValue)(dispatch);
  };

  return toggleThemeAction;
};

export default useToggleTheme;
