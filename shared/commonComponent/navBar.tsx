import { useRouter } from "next/dist/client/router";
import React, { useMemo } from "react";
import { useRecoilValue } from "recoil";
import Search from "../../components/search";
import { navbarVisibleState } from "../store/navbarVisible";

export const PAGE_TITLES = {
  calcFishTank: "물양 계산기",
  info: "fishhi 백과",
};

const Navbar = () => {
  const router = useRouter();
  const { pathname, asPath } = router;
  const title = useMemo(() => {
    const currentpage = Object.keys(PAGE_TITLES).filter(page => pathname.indexOf(page) !== -1)[0];
    return (PAGE_TITLES as any)[currentpage] || "Fish Hi";
  }, [pathname]);
  const navbarVisible = useRecoilValue(navbarVisibleState);
  if (!navbarVisible) return <></>;
  return (
    <>
      <div className="navbar">
        <h1
          style={{
            width: "100%",
            fontSize: 21,
            fontWeight: 700,
            fontFamily: "GmarketSansLight",
            marginLeft: "auto",
            marginRight: "auto",
            paddingLeft: 10,
            paddingRight: 10,
          }}
        >
          {title}
        </h1>
      </div>

      <style jsx>{`
        .navbar {
          width: 100%;
          display: flex;
          align-items: center;
          padding-top: 5px;
          padding-left: 10px;
          padding-right: 10px;
          padding-bottom: 5px;
          box-sizing: border-box;
          position: sticky;
          top: 0;
          background-color: white;
          z-index: 500;
        }
      `}</style>
    </>
  );
};

export default Navbar;
