import Link from 'next/dist/client/link';
import React, { useMemo } from 'react';
import { CSSProperties } from 'styled-components';
import ImagePath from '../imagePath';
import LinkCustom from './link';

export interface ITitleProps {
  title: string;
  img?: string;
  href?: string;
  width?: string | number;
  height?: string | number;
  fontSize?: number;
  fontWeight?: number;
  color?: string;
  style?: CSSProperties;
  useReplace?: boolean;
  target?: '_self' | '_blank';
  onClick?: (value?: any) => void;
}

const Title = (props: ITitleProps) => {
  const {
    title,
    img,
    width,
    height,
    fontSize = 18,
    fontWeight = 700,
    color,
    style,
    href,
    useReplace = false,
    target,
  } = props;

  const TitleBase = useMemo(() => {
    return (
      <div className="title">
        <div className="title-info">
          {img && <img className="title-label-img" src={img} width={width} height={height} />}
          <p
            className="title-text"
            style={{
              fontSize: fontSize,
              fontWeight: fontWeight,
            }}
          >
            {title}
          </p>
        </div>

        <img className="title-arrow" src={ImagePath.arrow('right')} width={20} height={20} />

        <style jsx>{`
          .title {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          .title-info {
            display: flex;
            align-items: center;
            padding-left: 10px;
          }

          .title-label-img {
            margin-right: 5px;
          }

          .title-arrow {
            margin-right: 10px;
          }
        `}</style>
      </div>
    );
  }, [props]);

  if (href) {
    return (
      <LinkCustom href={href} useReplace={useReplace} target={target}>
        {TitleBase}
      </LinkCustom>
    );
  }

  return TitleBase;
};

export default Title;
