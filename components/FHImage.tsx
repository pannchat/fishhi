import React, { useCallback } from "react";
import { CSSProperties } from "styled-components";
import ImagePath from "../shared/imagePath";

interface IFHImageProps {
  src?: string;
  width?: string | number;
  height?: string | number;
  alt?: string;
  placeholder?: string;
  style?: CSSProperties;
  onClick?: (value?: any) => void;
}

const FHImage = (props: IFHImageProps) => {
  const { src, width, height, alt, placeholder, style, onClick } = props;
  const onErrorHandler = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      e.currentTarget.style.position = "absolute";
      e.currentTarget.style.transition = "none";
      e.currentTarget.style.transform = "translate(-50%, -50%)";
      e.currentTarget.style.top = "50%";
      e.currentTarget.style.left = "50%";
      e.currentTarget.style.width = "100px";
      e.currentTarget.style.height = "50px";
      if (placeholder) e.currentTarget.src = placeholder;
    },
    [placeholder],
  );

  return (
    <img src={src} width={width} height={height} alt={alt} style={style} onClick={onClick} onError={onErrorHandler} />
  );
};

export default FHImage;
