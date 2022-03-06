import { useRouter } from "next/dist/client/router";
import React, { useCallback, useEffect, useMemo } from "react";
import Spacing from "../../shared/commonComponent/spacing";
import { FishSpeciesName } from "../../shared/enum";
import { getEumEntries } from "../../shared/funtion";
import InfiniteScrollWrapper from "../infiniteScrollWrapper";
import useGetInfoInfinite from "../info/hooks/useGetInfoInfinite";
import { SpeciesItem } from "../info/species";

interface IContetnsProps {
  type: string;
}
const Contents = (props: IContetnsProps) => {
  const { type } = props;
  const { refinedObj } = getEumEntries(FishSpeciesName);
  const speciesName = refinedObj[type];
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
      <h1 className="content-title">{speciesName}</h1>
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
      <style jsx>{`
        .contents-wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
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
