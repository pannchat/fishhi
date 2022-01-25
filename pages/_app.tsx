import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React, { useMemo } from 'react';
import Footer from '../shared/commonComponent/footer';
import ImagePath from '../shared/imagePath';
import { RecoilRoot } from 'recoil';
import { AppContextType, NextPageContext } from 'next/dist/shared/lib/utils';
import { GetStaticProps } from 'next';
import { SWRConfig } from 'swr';
import Navbar from '../shared/commonComponent/navBar';

const FOOTER_ITEMS = [
  {
    itemKey: 'calculrator',
    href: '/',
    text: '물양계산기',
    image: ImagePath.calculator,
    width: 35,
    height: 35,
    style: {
      flexBasis: '25%',
      cursor: 'pointer',
    },
  },
  {
    itemKey: 'fish',
    href: '/info/fish',
    text: '어종',
    image: ImagePath.fishes,
    width: 35,
    height: 35,
    style: {
      flexBasis: '25%',
      cursor: 'pointer',
    },
  },

  {
    itemKey: 'aquaplant',
    text: '수초',
    href: '/info/aquaplant',
    image: ImagePath.aquaPlant,
    width: 40,
    height: 40,
    style: {
      flexBasis: '25%',
      cursor: 'pointer',
    },
  },
  {
    itemKey: 'supplies',
    text: '용품',
    href: '/info/supplies',
    image: ImagePath.aquariumIcon,
    width: 38,
    height: 38,
    style: {
      flexBasis: '25%',
      cursor: 'pointer',
    },
  },
];
// for merge
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig>
      <RecoilRoot>
        <div className="app">
          <Navbar />
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
    </SWRConfig>
  );
}
export default MyApp;

MyApp.getInitialProps = async (appContext: AppContextType<any>) => {
  return {
    pagePrpos: {
      title: '피쉬하이',
    },
  };
};
