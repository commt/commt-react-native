import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const Dots = (props: SvgProps) => (
  <Svg width={16} height={5} {...props}>
    <Path
      fill="#B3B6B7"
      d="M1.333.167C.6.167 0 .767 0 1.5s.6 1.333 1.333 1.333c.734 0 1.334-.6 1.334-1.333S2.067.167 1.333.167Zm13.334 0c-.734 0-1.334.6-1.334 1.333s.6 1.333 1.334 1.333C15.4 2.833 16 2.233 16 1.5S15.4.167 14.667.167ZM8 .167c-.733 0-1.333.6-1.333 1.333S7.267 2.833 8 2.833s1.333-.6 1.333-1.333S8.733.167 8 .167Z"
    />
  </Svg>
);
export default Dots;
