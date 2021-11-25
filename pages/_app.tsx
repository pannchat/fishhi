import "../styles/globals.css";
import type { AppProps } from "next/app";
import React, { useMemo } from "react";
import Footer from "../shared/commonComponent/footer";
import ImagePath from "../shared/imagePath";
import { RecoilRoot } from "recoil";
import { AppContextType, NextPageContext } from "next/dist/shared/lib/utils";
import { GetStaticProps } from "next";

const FOOTER_ITEMS = [
  {
    itemKey: "hone",
    href: "/",
    text: "홈",
    image: ImagePath.home,
    width: 35,
    height: 35,
    style: {
      flexBasis: "25%",
      cursor: "pointer",
    },
  },
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
    itemKey: "info",
    text: "피쉬하이 백과",
    href: "/info",
    image: ImagePath.fishes,
    width: 40,
    height: 40,
    style: {
      flexBasis: "25%",
      cursor: "pointer",
    },
  },
  {
    itemKey: "auth",
    text: "미정",
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
  console.log(Component);
  console.log("pageProps => ", pageProps);
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

MyApp.getInitialProps = async (appContext: AppContextType<any>) => {
  return {
    pagePrpos: {
      title: "피쉬하이",
    },
  };
};
