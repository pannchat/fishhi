import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { navbarVisibleState } from "../store/navbarVisible";

export default function useHideNavbar() {
  const setIsNavbarVisible = useSetRecoilState(navbarVisibleState);

  useEffect(() => {
    setIsNavbarVisible(false);
    return () => {
      setIsNavbarVisible(true);
    };
  }, [setIsNavbarVisible]);
}
