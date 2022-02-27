import React from "react";
import { CSSProperties } from "styled-components";
import FHImage from "../FHImage";

export interface ISpecData {
  name: string;
  spec: string;
  img?: string;
}

interface ISpecBox extends ISpecData {
  imgWidth?: string | number;
  imgHeight?: string | number;
  width?: string | number;
  height?: string | number;
  color?: string;
  specColor?: string;
  style?: CSSProperties;
}

const SpecBox = (props: ISpecBox) => {
  const { img, imgWidth, imgHeight, name, spec, color, width, height, specColor, style } = props;
  return (
    <div
      className="spec-box"
      style={{
        width: width,
        height: height,
        backgroundColor: color,
        padding: 5,
        ...style,
      }}
    >
      {img ? <FHImage src={img} width={imgWidth} height={imgHeight} /> : <div></div>}

      <div className="spec-box-footer">
        <p
          className="spec-name"
          style={{
            color: specColor,
          }}
        >
          {name}
        </p>
        <p
          className="spec-value"
          style={{
            color: specColor,
          }}
        >
          {spec}
        </p>
      </div>

      <style jsx>{`
        .spec-box {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          border-radius: 5px;
        }

        .spec-box-footer {
          height: 100%;
          margin-top: auto;
          margin-bottom: auto;
        }
      `}</style>
    </div>
  );
};

export default SpecBox;
