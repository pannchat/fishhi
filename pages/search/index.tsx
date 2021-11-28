import { useRouter } from "next/dist/client/router";
import React from "react";

const SEARCH_PAGE_KEY = "searchText";

const SearchPage = () => {
  const router = useRouter();
  const { query } = router;
  const searchText = query[SEARCH_PAGE_KEY];
  return (
    <div>
      <h1>검색 결과 페이지</h1>
      <p>검색어 : {searchText}</p>
    </div>
  );
};

export default SearchPage;
