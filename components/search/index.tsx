import React from "react";
import SearchInput from "./searchInput";
import SearchSuggestion from "./searchSuggestion";

const Search = () => {
  return (
    <div className="search__wrapper">
      <SearchInput />
      <SearchSuggestion />

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
