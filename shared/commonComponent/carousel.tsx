import { throttle } from "lodash";
import React, { useCallback, useRef, useState } from "react";
import { CSSProperties } from "styled-components";
import { ScrollButton } from "./button";

interface ICarouselProps<T> {
  data: T[];
  width: number;
  height?: string | number;
  style?: CSSProperties;
  ItemComponent: (props: T) => JSX.Element;
}

const Carousel = <T extends unknown>(props: ICarouselProps<T>) => {
  const { data, width, height, style, ItemComponent } = props;
  const [currentScroll, setCurrentScroll] = useState<number>(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const handleScroll = throttle((value: number) => {
    setCurrentScroll(value);
  }, 300);
  const clickLeftHandle = useCallback(() => {
    if (width) {
      wrapperRef.current &&
        wrapperRef.current.scrollTo({
          left: currentScroll - width,
          behavior: "smooth",
        });
    }
  }, [currentScroll, wrapperRef.current]);

  const clickRightHandle = useCallback(() => {
    if (width) {
      wrapperRef.current &&
        wrapperRef.current.scrollTo({
          left: currentScroll + width,
          behavior: "smooth",
        });
    }
  }, [currentScroll, wrapperRef.current]);

  return (
    <div className="carousel__wrapper">
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
        className="carousel"
        ref={wrapperRef}
        style={{
          width: width,
          height: height,
        }}
        onScroll={(e) => {
          handleScroll(e.currentTarget.scrollLeft);
        }}
      >
        {data?.map((value, index: number) => {
          return <ItemComponent key={`carouselItem${index}`} {...value} />;
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
        .carousel__wrapper {
          position: relative;
        }
        .carousel {
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
