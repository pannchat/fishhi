/* eslint-disable @next/next/no-img-element */
import { AspectRatio } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import React from "react";
import { CSSProperties } from "styled-components";
import useFooterVisible from "../hooks/useFooterVisible";
import CustomImage from "./image";
import LinkCustom from "./link";
import Spacing from "./spacing";

interface IFooterProps {
  footerItems: IFooterItemProps[];
  style?: CSSProperties;
}

const Footer = (props: IFooterProps) => {
  const { footerItems, style } = props;
  const { isFooterVisible } = useFooterVisible();
  if (!isFooterVisible) return <></>;
  return (
    <>
      <div className="footer" style={style}>
        {footerItems.map((value, index) => (
          <LinkCustom key={`footerItem${index}`} href={value.href}>
            <FooterItem key={`footerItem${index}`} {...value} />
          </LinkCustom>
        ))}
      </div>
      <Spacing height={75} />
      <style jsx>{`
        .footer {
          width: 100%;
          height: 75px;
          position: fixed;
          bottom: 0;
          background-color: white;
          border-top: 1px solid #d2d2d2;

          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: white;
          padding-left: 10px;
          padding-right: 10px;
          z-index: 700;
        }
      `}</style>
    </>
  );
};

export default Footer;

interface IFooterItemProps {
  text: string;
  href: string;
  image?: string;
  width?: string | number;
  height?: string | number;
  onClick?: (value?: any) => void;
  style?: CSSProperties;
}

const FooterItem = (props: IFooterItemProps) => {
  const { text, image, width, height, onClick, style } = props;

  return (
    <div className="footer-item" style={{ ...style }}>
      {image && <CustomImage src={image} width={width} height={height} ratio={1 / 1} useSkeleton />}

      <p className="footer-label">{text}</p>

      <style jsx>{`
        .footer-item {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .footer-label {
          font-size: 14px;
          font-weight: 400;
        }
      `}</style>
    </div>
  );
};
