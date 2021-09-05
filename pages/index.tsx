import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import FHNavbar, { FHMainNavbar } from "../components/FHNavbar";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className="app__wrapper">
      <FHNavbar />
      <FHMainNavbar />
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
