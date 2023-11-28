import TYPOGRAPHY from "./typography";
import SPACINGS from "./spacings";
import COLORS from "./colors";

const { DARK_THEME_COLORS, LIGHT_THEME_COLORS } = COLORS;

const COMMON = {
  typography: TYPOGRAPHY,
  spacing: SPACINGS,
};

export const DARK_THEME = {
  ...COMMON,
  colors: DARK_THEME_COLORS,
};

export const LIGHT_THEME = {
  ...COMMON,
  colors: LIGHT_THEME_COLORS,
};

interface Theme {
  colors: typeof DARK_THEME_COLORS | typeof LIGHT_THEME_COLORS;
  spacing: typeof SPACINGS;
  typography: typeof TYPOGRAPHY;
}

declare module "styled-components/native" {
  export type DefaultTheme = Theme;
}
