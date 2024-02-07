import { useContext } from "react";
import { CommtContext } from "../context/Context";
import { toggleTheme } from "../context/actions/appActions";

type ToggleThemeProps = {
  passive: string; // app2 = ui3 = ui2
  bubble: string; // brand5
  bcg: string; // app3
  searchText: string; // app5
  read1: string; // ui8
  read2: string; // brand2
  app1: string; //app1
  app2: string; // ui1
  app3: string; // ui4 = ui5 = ui10
  app4: string; // ui7
  app5: string; // ui9
  app6: string; // brand1
  app7: string; // brand3
  app8: string; // brand4
  ui1: string; // app4
  ui2: string; // ui6
};

const useToggleTheme = () => {
  const { dispatch } = useContext(CommtContext);

  const toggleThemeAction = (themeValue: ToggleThemeProps) => {
    const theme = {
      app: {
        app1: themeValue.app1,
        app2: themeValue.passive,
        app3: themeValue.bcg,
        app4: themeValue.ui1,
        app5: themeValue.searchText,
      },
      ui: {
        ui1: themeValue.app2,
        ui2: themeValue.passive,
        ui3: themeValue.passive,
        ui4: themeValue.app3,
        ui5: themeValue.app3,
        ui6: themeValue.ui2,
        ui7: themeValue.app4,
        ui8: themeValue.read1,
        ui9: themeValue.app5,
        ui10: themeValue.app3,
      },
      brand: {
        brand1: themeValue.app6,
        brand2: themeValue.read2,
        brand3: themeValue.app7,
        brand4: themeValue.app8,
        brand5: themeValue.bubble,
      },
    };
    toggleTheme(theme)(dispatch);
  };

  return toggleThemeAction;
};

export default useToggleTheme;
