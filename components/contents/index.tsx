import { useRouter } from "next/dist/client/router";
import React, { useCallback, useEffect, useMemo } from "react";
import Spacing from "../../shared/commonComponent/spacing";
import { FishSpeciesName } from "../../shared/enum";
import { getEumEntries } from "../../shared/funtion";
import { IContentsItem } from "../../shared/interface";
import InfiniteScrollWrapper from "../infiniteScrollWrapper";
import useGetInfoInfinite, { IUseGetInfoInfiniteResponse } from "../info/hooks/useGetInfoInfinite";
import { SpeciesItem } from "../info/species";

export interface IInitData<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

interface IContetnsProps {
  type: string;
  initData?: IUseGetInfoInfiniteResponse;
}
const Contents = (props: IContetnsProps) => {
  const { type, initData } = props;
  const { refinedObj } = getEumEntries(FishSpeciesName);
  const speciesName = refinedObj[type];
  const { data, isLoading, size, setSize } = useGetInfoInfinite({ type: type, initData: initData });
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
      <h1 className="content-title">{speciesName}</h1>
      <div>
        <InfiniteScrollWrapper
          fetchMore={fetchMoreHandler}
          canFetchMore={canFetchMore}
          isLoading={isLoading}
          hasNextPage={canFetchMore}
          intersectionObserverOption={{
            rootMargin: "10px",
          }}
        >
          <div>
            {data?.map((value, index) => {
              if (value) {
                const { results } = value;
                return (
                  <div className="contents-wrapper" key={`contents${index}`}>
                    {results.map((content, i) => {
                      return (
                        <div key={`speciesItem${index}${i}`} className="contents">
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
        </InfiniteScrollWrapper>
      </div>
      <style jsx>{`
        .contents-wrapper {
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-columns: repeat(2, calc(100% / 2 - 15px));
          column-gap: 30px;
          grid-row-gap: 20px;
        }

        .content-title {
          font-size: 18px;
          font-weight: 700;
          padding-left: 20px;
          padding-top: 20px;
          padding-bottom: 20px;
        }

        .contents {
          flex-basis: 40%;
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  );
};

export default Contents;
