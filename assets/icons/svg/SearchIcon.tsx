import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const SearchIcon = (props: SvgProps) => (
  <Svg width={14} height={14} {...props}>
    <Path
      fill="#B3B6B7"
      d="m10.518 9.693 2.498 2.498-.825.825-2.498-2.498a5.252 5.252 0 0 1-8.526-4.101 5.252 5.252 0 0 1 5.25-5.25 5.252 5.252 0 0 1 4.101 8.526Zm-1.17-.433a4.082 4.082 0 0 0-2.931-6.927 4.082 4.082 0 0 0-4.084 4.084 4.082 4.082 0 0 0 6.927 2.93l.088-.087Z"
    />
  </Svg>
);
export default SearchIcon;
