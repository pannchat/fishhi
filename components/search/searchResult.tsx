import React, { useMemo } from "react";
import { useRouter } from "next/dist/client/router";
import { SEARCH_PAGE_KEY } from "../../pages/search";
// import { FISH_LIST } from "../../shared/dummy";

const SearchResult = () => {
  const router = useRouter();
  const { query } = router;
  const searchText = query[SEARCH_PAGE_KEY] as string;
  // const resultList = FISH_LIST.data;
  // const result = useMemo(() => {
  //   return resultList.filter(
  //     (result) => result.name.indexOf(searchText) !== -1
  //   );
  // }, [resultList]);

  return (
    <div>
      <h1>검색 결과 페이지</h1>
      <p>검색어 : {searchText}</p>
      <h6>검색 결과 데이터 : </h6>
      <p>
        {/* {result?.length > 0
          ? result.map((resultItem) => {
              const { id, name } = resultItem;
              return (
                <SearchResultItem
                  key={`searchResult${id}`}
                  data={{ ...resultItem }}
                />
              );
            })
          : "검색결과가 없습니다."} */}
      </p>
    </div>
  );
};

export default SearchResult;

interface ISearchResultItem<T> {
  data: T;
  // dataKeys: string[];
}

const SearchResultItem = <T extends unknown>(props: ISearchResultItem<T>) => {
  return <div></div>;
};
