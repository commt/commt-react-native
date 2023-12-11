import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const SingleCheck = (props: SvgProps) => (
  <Svg width={11} height={7} {...props}>
    <Path
      fill="#676D6F"
      d="m4.855 5.26-.869-.87-.87-.869L1.81 2.214l-.87.87L4.855 7l6.08-6.08-.87-.87-5.21 5.21Z"
    />
  </Svg>
);
export default SingleCheck;
