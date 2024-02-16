const COLOR_PALETTE = {
  gray: {
    50: "#F8FAFA",
    100: "#ECEDED",
    200: "#D9DBDB",
    300: "#B3B6B7",
    400: "#8D9293",
    500: "#676D6F",
    600: "#41494B",
    700: "#343A3C",
    800: "#272C2D",
    900: "#1A1D1E",
    1000: "#0D0F0F",
  },
  red: {
    100: "#FBE9EA",
    200: "#F6D3D5",
    300: "#EDA6AB",
    400: "#E57A81",
    500: "#DC4D57",
    600: "#D3212D",
    700: "#A91A24",
    800: "#7F141B",
    900: "#540D12",
    1000: "#2A0709",
  },
  green: {
    100: "#3FC610",
    200: "#1B9C32",
  },
  white: "#FFF",
};

const LIGHT_THEME_COLORS = {
  app: {
    app1: COLOR_PALETTE.gray[1000], // text & username color
    app2: COLOR_PALETTE.gray[300], // messages screen message color & 'online' text color under username
    app3: COLOR_PALETTE.white, // app bcg color
    app4: COLOR_PALETTE.white, // send button icon & first user bubble text color
    app5: COLOR_PALETTE.gray[500], // search bar search text color
  },
  ui: {
    ui1: COLOR_PALETTE.gray[700], // chat input active text & send button passive bcg & second user bubble text color
    ui2: COLOR_PALETTE.gray[300], // chat input emoji icon & three dots icon color
    ui3: COLOR_PALETTE.gray[300], // subtitles & passive text & time & search bar icon and placeholder & chat input placeholder & passive username color
    ui4: COLOR_PALETTE.gray[100], // second user bubble bcg color
    ui5: COLOR_PALETTE.gray[100], // stroke & search bar bcg color & chat input bcg color
    ui6: COLOR_PALETTE.white, // chat screen header and footer bcg color
    ui7: COLOR_PALETTE.green[100], // online user color
    ui8: COLOR_PALETTE.green[200], // message red icon color
    ui9: COLOR_PALETTE.gray[50], // chat area bcg color
    ui10: COLOR_PALETTE.gray[100], // chat input border color
  },
  brand: {
    brand1: COLOR_PALETTE.red[100], // unread badge text color,
    brand2: COLOR_PALETTE.red[300], // message had read badge icon color under bubble
    brand3: COLOR_PALETTE.red[500], // send button active bcg color
    brand4: COLOR_PALETTE.red[600], // unread badge bcg color
    brand5: COLOR_PALETTE.red[500], // first user bubble bcg color
  },
};

export default { LIGHT_THEME_COLORS };
