import React from 'react';
import SearchInput from './searchInput';
import SearchSuggestion from './searchSuggestion';

export interface ISearchProps {
  width?: string | number;
  height?: string | number;
}

const Search = (props: ISearchProps) => {
  const { width, height } = props;
  return (
    <div className="search__wrapper">
      <SearchInput />
      <SearchSuggestion />

      <style jsx>{`
        .search__wrapper {
          position: relative;
          width: 100%;
          margin-left: auto;
          margin-right: auto;
        }
      `}</style>
    </div>
  );
};

export default Search;
