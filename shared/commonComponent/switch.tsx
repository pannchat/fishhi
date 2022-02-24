import React, { useState } from "react";
import { CSSProperties } from "styled-components";

interface ISwitchProps {
  isActive: boolean;
  label?: string;
  labelSize?: number;
  labelWeight?: number;
  defaultColor?: string;
  color?: string;
  buttonColor?: string;
  buttonWidth?: number;
  buttonHeight?: number;
  style?: CSSProperties;
  onClick?: (value?: any) => void;
}

const Switch = (props: ISwitchProps) => {
  const {
    label,
    labelSize = 20,
    labelWeight = 400,
    defaultColor = "grey",
    color = "#8aa1a1",
    buttonHeight = 25,
    buttonWidth = 25,
    buttonColor = "white",
    style,
    isActive,
    onClick,
  } = props;

  const switchBarWidth = buttonWidth * 2.5;
  return (
    <div
      className="switch__wrapper"
      onClick={() => {
        if (onClick) onClick();
      }}
      style={{ ...style }}
    >
      {label && (
        <p
          className="switch__label"
          style={{
            fontSize: labelSize,
            fontWeight: labelWeight,
            color: 'grey',
            marginRight: '5px',
          }}
        >
          {label}
        </p>
      )}
      <div
        className="switch"
        style={{
          width: switchBarWidth,
        }}
      >
        <div
          className="switch-button"
          style={{
            borderRadius: "100%",
            backgroundColor: buttonColor,
            width: buttonWidth - 5,
            height: buttonHeight - 5,
            left: isActive ? `calc(100% - ${buttonWidth}px)` : "5%",
          }}
        ></div>
      </div>

      <style jsx>{`
        .switch__wrapper {
          display: flex;
        }
        .switch {
          position: relative;
          border-radius: 25px;
          background-color: ${isActive ? color : defaultColor};
        }

        .switch-button {
          position: absolute;
          transform: translate(0, -50%);
          top: 50%;

          transition: all 0.3s;
        }
      `}</style>
    </div>
  );
};

export default Switch;
