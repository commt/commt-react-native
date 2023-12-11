import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const EmojiIcon = (props: SvgProps) => (
  <Svg width={14} height={14} {...props}>
    <Path
      fill="#B3B6B7"
      d="M14 6.048a7.024 7.024 0 0 0-6.599 2.725 3.501 3.501 0 0 1-2.711-.877L3.75 8.944a4.907 4.907 0 0 0 2.824 1.233A7.012 7.012 0 0 0 6.048 14a7.036 7.036 0 0 1 .986-14C10.584 0 13.52 2.63 14 6.048Zm-.022 1.42a5.62 5.62 0 0 0-5.602 2.357 5.598 5.598 0 0 0-.99 3.189c0 .328.028.65.082.964l6.51-6.51Zm-9.406-.785a1.055 1.055 0 1 0 0-2.11 1.055 1.055 0 0 0 0 2.11Zm4.924 0a1.055 1.055 0 1 0 0-2.11 1.055 1.055 0 0 0 0 2.11Z"
    />
  </Svg>
);
export default EmojiIcon;
