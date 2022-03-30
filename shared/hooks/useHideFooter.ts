import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { footerVisibleState } from "../store/footerVisible";

export default function useHideFooter() {
  const setFooterVisible = useSetRecoilState(footerVisibleState);

  useEffect(() => {
    setFooterVisible(false);
    return () => {
      setFooterVisible(true);
    };
  }, [setFooterVisible]);
}
