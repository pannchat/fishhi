/* eslint-disable react/display-name */
import React, { ReactNode, RefObject } from "react";
import Link from "next/link";
import { CSSProperties } from "styled-components";

interface ILinkCustomProps {
  href: string;
  useReplace?: boolean;
  target?: "_blank" | "_self";
  children: ReactNode;
  style?: CSSProperties;
}

const LinkCustom = React.forwardRef((props: ILinkCustomProps, ref) => {
  const { children, href, useReplace = false, target, style } = props;
  const anchorRef = ref as RefObject<HTMLAnchorElement>;
  return (
    <Link href={href} replace={useReplace} passHref>
      <a target={target} style={style} ref={anchorRef}>
        {children}
      </a>
    </Link>
  );
});

export default LinkCustom;
