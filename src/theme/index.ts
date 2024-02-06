import TYPOGRAPHY from "./typography";
import SPACINGS from "./spacings";
import COLORS from "./colors";

const { LIGHT_THEME_COLORS } = COLORS;

const COMMON = {
  typography: TYPOGRAPHY,
  spacing: SPACINGS,
};

export const LIGHT_THEME = {
  ...COMMON,
  colors: LIGHT_THEME_COLORS,
};

interface Theme {
  colors: typeof LIGHT_THEME_COLORS;
  spacing: typeof SPACINGS;
  typography: typeof TYPOGRAPHY;
}

declare module "styled-components/native" {
  export type DefaultTheme = Theme;
}
