import { useRouter } from "next/dist/client/router";
import React, { useCallback, useEffect, useMemo } from "react";
import InfiniteScrollWrapper from "../infiniteScrollWrapper";
import useGetInfoInfinite from "../info/hooks/useGetInfoInfinite";

interface IContetnsProps {
  type: string;
}
const Contents = (props: IContetnsProps) => {
  const { type } = props;
  const { data, isLoading, size, setSize } = useGetInfoInfinite({ type: type });
  const canFetchMore = useMemo(() => {
    if (data && data.length > 0) {
      const curData = data[data.length - 1];

      if ((curData as any)["next"]) {
        return true;
      }
    }

    return false;
  }, [data]);

  const fetchMoreHandler = useCallback(() => {
    setSize(size + 1);
  }, [size, setSize]);

  if (!isLoading && !data) return <></>;

  return (
    <div>
      <InfiniteScrollWrapper fetchMore={fetchMoreHandler} canFetchMore={canFetchMore} isLoading={isLoading}>
        <div>
          {data?.map((value, index) => {
            if (value) {
              const { results } = value;
              console.log("results => ", results);
              return <p key={`data${index}`}>{}</p>;
            }
            return <></>;
          })}
        </div>
      </InfiniteScrollWrapper>
    </div>
  );
};

export default Contents;
