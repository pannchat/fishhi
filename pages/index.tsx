import type { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import { getSuppliesProduct } from '../api';
import Main from '../components';
import CalcFishTank from '../components/calcFishTank';
import FHNavbar, { FHMainNavbar } from '../components/FHNavbar';
import PostBox from '../components/PostBox';
import Search from '../components/search';
import SearchInput from '../components/search/searchInput';
import Spacing from '../shared/commonComponent/spacing';
import useFishList from '../shared/hooks/useFishList';

import usePostUserLogin from '../shared/hooks/usePostUserLogin';
import { IGetSuppliesProductResponse } from '../shared/hooks/useSuppliesProduct';
import ImagePath from '../shared/imagePath';
import styles from '../styles/Home.module.css';

const dummy = [
  {
    image: ImagePath.thumb,
    title: '1번 포스트',
    nickname: '관리자',
  },
  {
    image: ImagePath.thumb2,
    title: '2번 포스트',
    nickname: '관리자',
  },
];

export async function getStaticProps() {
  const suppliesProduct = await getSuppliesProduct();

  return {
    props: {
      suppliesProduct,
    },
  };
}

interface IHomeProps {
  suppliesProduct: IGetSuppliesProductResponse;
}

const MAIN_COL_GAP = 30;
const Home: NextPage<IHomeProps> = (props: { suppliesProduct: IGetSuppliesProductResponse }) => {
  const { suppliesProduct } = props;
  const router = useRouter();
  return (
    <div className="app__wrapper">
      <Spacing height={MAIN_COL_GAP} />
      <CalcFishTank initData={suppliesProduct} />
      <style jsx>
        {`
          .app__wrapper {
            max-width: 500px;
            margin-left: auto;
            margin-right: auto;
          }
        `}
      </style>
    </div>
  );
};

export default Home;
