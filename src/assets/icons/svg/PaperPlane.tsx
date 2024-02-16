import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const PaperPlane = (props: SvgProps) => (
  <Svg width={14} height={14} {...props}>
    <Path
      fill={props.color ?? "#fff"}
      d="M.763 4.888c-.362-.12-.365-.316.008-.44L14.009.035c.366-.122.577.083.474.443L10.7 13.716c-.104.367-.316.38-.47.031l-2.494-5.61 4.162-5.548L6.35 6.75.763 4.888Z"
    />
  </Svg>
);
export default PaperPlane;
