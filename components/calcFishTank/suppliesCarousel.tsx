import { throttle } from "lodash";
import React, { useCallback, useRef, useState } from "react";
import { CSSProperties } from "styled-components";
import { useSuppliesProduct } from "../../shared/hooks/useSuppliesProduct";
import SupplyBox from "./supplyBox";

interface ISuppliesCarousel {
  supplyWidth?: number;
}

const SuppliesCarousel = (props: ISuppliesCarousel) => {
  return <div></div>;
};

export default SuppliesCarousel;

interface IScrollButton {
  type: "right" | "left";
  width?: string | number;
  height?: string | number;
  style?: CSSProperties;
  onClick?: (value?: any) => void;
}

const ScrollButton = (props: IScrollButton) => {
  const { type, width, height, style, onClick } = props;
  const innerMark = type === "left" ? "<" : ">";
  return (
    <div
      className="scroll-button"
      style={{
        width: width,
        height: height,
        ...style,
      }}
      onClick={onClick}
    >
      {innerMark}
      <style jsx>{`
        .scroll-button {
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 100%;
          background-color: #d2d2d2;
          opacity: 0.5;
          font-size: 16px;
          font-weight: 700;
        }
      `}</style>
    </div>
  );
};
