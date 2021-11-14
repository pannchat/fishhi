import React, { ReactNode } from "react";
import Link from "next/link";
import { CSSProperties } from "styled-components";

interface ILinkCustomProps {
  href: string;
  useReplace?: boolean;
  target?: "_blank" | "_self";
  children: ReactNode;
  style?: CSSProperties;
}

const LinkCustom = (props: ILinkCustomProps) => {
  const { children, href, useReplace = false, target, style } = props;
  return (
    <Link href={href} replace={useReplace}>
      <a target={target} style={style}>
        {children}
      </a>
    </Link>
  );
};

export default LinkCustom;
