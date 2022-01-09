import type { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import Main from '../components';
import FHNavbar, { FHMainNavbar } from '../components/FHNavbar';
import PostBox from '../components/PostBox';
import Search from '../components/search';
import SearchInput from '../components/search/searchInput';
import Spacing from '../shared/commonComponent/spacing';
import useFishList from '../shared/hooks/useFishList';

import usePostUserLogin from '../shared/hooks/usePostUserLogin';
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

const MAIN_COL_GAP = 30;
const Home: NextPage = () => {
  const router = useRouter();
  return (
    <div className="app__wrapper">
      <Spacing height={MAIN_COL_GAP} />
      <Main />
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
