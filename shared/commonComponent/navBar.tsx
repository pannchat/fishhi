import { useRouter } from "next/dist/client/router";
import React, { useMemo } from "react";
import Search from "../../components/search";

export const PAGE_TITLES = {
  calcFishTank: "물양 계산기",
  info: "fishhi 백과",
};

const Navbar = () => {
  const router = useRouter();
  const { pathname } = router;
  const title = useMemo(() => {
    const currentpage = Object.keys(PAGE_TITLES).filter(page => pathname.indexOf(page) !== -1)[0];
    return (PAGE_TITLES as any)[currentpage] || "Fish Hi";
  }, [pathname]);

  return (
    <>
      <div className="navbar">
        <h1
          style={{
            width: "50%",
            fontSize: 21,
            fontWeight: 700,
            fontFamily: "GmarketSansLight",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {title}
        </h1>

        <Search width={"50%"} />
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
