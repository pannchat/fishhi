import { useRouter } from "next/dist/client/router";
import React, { useEffect, useMemo } from "react";
import useGetInfoInfinite from "../info/hooks/useGetInfoInfinite";

interface IContetnsProps {
  type: string;
}
const Contents = (props: IContetnsProps) => {
  const { type } = props;
  const { data, size, setSize } = useGetInfoInfinite({ type: type });
  console.log("data => ", data);
  useEffect(() => {
    setSize(size + 1);
  }, []);
  return <div></div>;
};

export default Contents;
