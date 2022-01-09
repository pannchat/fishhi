import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
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

const Home: NextPage = () => {
  return (
    <div className="app__wrapper">
      <h1
        style={{
          fontSize: 24,
          fontWeight: 700,
        }}
      >
        피쉬하이
      </h1>

      <Search />
      <Spacing height={10} />
      {dummy.map((value, index) => {
        return (
          <div
            key={`postBox${index}`}
            style={{
              cursor: 'pointer',
            }}
          >
            <PostBox image={value.image} nickname={value.nickname} title={value.title} />
            <Spacing height={10} />
          </div>
        );
      })}
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
