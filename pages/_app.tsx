import "../styles/globals.css";
import type { AppProps } from "next/app";
import React, { useMemo } from "react";
import Footer from "../shared/commonComponent/footer";
import ImagePath from "../shared/imagePath";
import { RecoilRoot } from "recoil";

const FOOTER_ITEMS = [
  {
    itemKey: "calculrator",
    href: "/calcFishTank",
    text: "어항계산기",
    image: ImagePath.aquarium,
    width: 40,
    height: 40,
    style: {
      flexBasis: "25%",
      cursor: "pointer",
    },
  },
  {
    itemKey: "auth",
    text: "마이페이지",
    href: "/",
    image: ImagePath.aquaPlant,
    width: 40,
    height: 40,
    style: {
      flexBasis: "25%",
      cursor: "pointer",
    },
  },
];

function MyApp({ Component, pageProps }: AppProps) {
  const FOOTER_REFINED_ITEMS = useMemo(() => {}, [FOOTER_ITEMS]);
  return (
    <RecoilRoot>
      <div className="app">
        <Component {...pageProps} />
        <Footer
          footerItems={FOOTER_ITEMS}
          style={{
            maxWidth: 500,
          }}
        />
        <style jsx>{`
          .app {
            max-width: 500px;
            margin-left: auto;
            margin-right: auto;
          }
        `}</style>
      </div>
    </RecoilRoot>
  );
}
export default MyApp;
