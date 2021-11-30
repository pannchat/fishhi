import React, { ReactElement, ReactNode } from "react";
import { CSSProperties } from "styled-components";

interface IButtonProps {
  width?: string | number;
  height?: string | number;
  color?: string;
  style?: CSSProperties;
  children?: ReactNode;
  onClick?: (value?: any) => void;
}

const BUTTON_DEFAULT_STYLE: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const Button = (props: IButtonProps) => {
  const {
    width = "100%",
    height = 50,
    color = "white",
    style,
    children,
    onClick,
  } = props;
  return (
    <div
      style={{
        width: width,
        height: height,
        background: color,
        ...BUTTON_DEFAULT_STYLE,
        ...style,
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Button;

interface IScrollButton extends IButtonProps {
  type: "right" | "left";
}

export const ScrollButton = (props: IScrollButton) => {
  const { type, ...buttonProps } = props;
  const innerMark = type === "left" ? "<" : ">";
  return <Button {...buttonProps}>{innerMark}</Button>;
};
