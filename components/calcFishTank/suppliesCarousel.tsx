import { throttle } from "lodash";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { CSSProperties } from "styled-components";
import { useSuppliesProduct } from "../../shared/hooks/useSuppliesProduct";
import SupplyBox from "./supplyBox";

interface ISuppliesCarousel {
  supplyWidth?: number;
}

const SuppliesCarousel = (props: ISuppliesCarousel) => {
  const { supplyWidth } = props;
  const { data } = useSuppliesProduct();
  const [currentScroll, setCurrentScroll] = useState<number>(0);
  const suppliesWrapperRef = useRef<HTMLDivElement | null>(null);
  const handleScroll = throttle((value: number) => {
    setCurrentScroll(value);
  }, 300);

  const clickLeftHandle = useCallback(() => {
    if (supplyWidth) {
      suppliesWrapperRef.current &&
        suppliesWrapperRef.current.scrollTo({
          left: currentScroll - supplyWidth,
          behavior: "smooth",
        });
    }
  }, [currentScroll, suppliesWrapperRef.current]);

  const clickRightHandle = useCallback(() => {
    if (supplyWidth) {
      suppliesWrapperRef.current &&
        suppliesWrapperRef.current.scrollTo({
          left: currentScroll + supplyWidth,
          behavior: "smooth",
        });
    }
  }, [currentScroll, suppliesWrapperRef.current]);

  return (
    <div className="supplies__carousel__wrapper">
      <ScrollButton
        type="left"
        width={30}
        height={30}
        onClick={clickLeftHandle}
        style={{
          position: "absolute",
          transform: "translate(-0,-50%)",
          top: "50%",
          cursor: "pointer",
          left: 0,
        }}
      />

      <div
        className="supplies__carousel"
        ref={suppliesWrapperRef}
        onScroll={(e) => {
          handleScroll(e.currentTarget.scrollLeft);
        }}
      >
        {data?.map((value: any, index: number) => {
          return (
            <SupplyBox
              key={`supplyBox${index}`}
              {...value}
              imgWidth={150}
              imgHeight={150}
            />
          );
        })}
      </div>

      <ScrollButton
        type="right"
        width={30}
        height={30}
        onClick={clickRightHandle}
        style={{
          position: "absolute",
          transform: "translate(-0,-50%)",
          cursor: "pointer",
          top: "50%",
          right: 0,
        }}
      />

      <style jsx>{`
        .supplies__carousel__wrapper {
          position: relative;
        }
        .supplies__carousel {
          display: flex;
          overflow-x: auto;
          width: 90%;
          margin-left: auto;
          margin-right: auto;
        }
        .search-list {
          margin-right: 20px;
        }
      `}</style>
    </div>
  );
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
