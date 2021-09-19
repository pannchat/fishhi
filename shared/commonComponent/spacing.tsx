import React from "react";
import { CSSProperties } from "styled-components";

interface ISpacingProps {
  width?: string | number;
  height?: string | number;
  color?: string;
  style?: CSSProperties;
}

const Spacing = (props: ISpacingProps) => {
  const { width = "100%", height = "100%", color = "white", style } = props;

  return (
    <div
      style={{
        width: width,
        height: height,
        backgroundColor: color,
        ...style,
      }}
    ></div>
  );
};

export default Spacing;
