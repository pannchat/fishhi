import React from "react";
import SearchInput from "./searchInput";
import SearchResult from "./searchResult";

const Search = () => {
  return (
    <div className="search__wrapper">
      <SearchInput />
      <SearchResult />

      <style jsx>{`
        .search__wrapper {
          position: relative;
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default Search;
