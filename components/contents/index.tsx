import { useRouter } from "next/dist/client/router";
import React, { useCallback, useEffect, useMemo } from "react";
import InfiniteScrollWrapper from "../infiniteScrollWrapper";
import useGetInfoInfinite from "../info/hooks/useGetInfoInfinite";
import { SpeciesItem } from "../info/species";

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
    <InfiniteScrollWrapper
      fetchMore={fetchMoreHandler}
      canFetchMore={canFetchMore}
      isLoading={isLoading}
      hasNextPage={canFetchMore}
    >
      <div>
        {data?.map((value, index) => {
          if (value) {
            const { results } = value;
            return (
              <div className="contents-wrapper" key={`contents${index}`}>
                {results.map((content, i) => {
                  return (
                    <div key={`speciesItem${i}`} className="contents">
                      <SpeciesItem data={content} species={type} />
                    </div>
                  );
                })}
              </div>
            );
          }
          return <></>;
        })}
      </div>

      <style jsx>{`
        .contents-wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
        }

        .contents {
          flex-basis: 40%;
        }
      `}</style>
    </InfiniteScrollWrapper>
  );
};

export default Contents;
