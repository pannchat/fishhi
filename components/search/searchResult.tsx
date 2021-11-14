import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  searchFocusState,
  searchSuggestionState,
  searchTextState,
} from "./stores/searchData";

const SearchResult = () => {
  const suggestion = useRecoilValue(searchSuggestionState);
  const searchText = useRecoilValue(searchTextState);
  const searchFocus = useRecoilValue(searchFocusState);
  const showSuggenstion = searchText.length > 0 && searchFocus;
  return (
    <div className="search-result__wrapper">
      {suggestion.length > 0 ? (
        suggestion.map((value, index) => {
          const { id, name } = value;
          return (
            <div key={`searchResultItem${id}`} className="search-result-item">
              {name}
            </div>
          );
        })
      ) : (
        <p className="search-result--no-result">검색결과가 없습니다.</p>
      )}

      <style jsx>{`
        .search-result__wrapper {
          position: absolute;
          top: 49px;
          height: auto;
          background-color: white;
          width: 100%;
          border: ${showSuggenstion ? `1px solid #d2d2d2` : "none"};
          opacity: ${showSuggenstion ? 1 : 0};
          transition: 0.3s ease opacity;
        }
        .search-result-item {
          box-sizing: border-box;
          line-height: 50px;
          vertical-align: middle;
          font-size: 14px;
          padding-left: 10px;
          cursor: pointer;
        }

        .search-result--no-result {
          font-size: 16px;
          font-weight: 700;
          height: 45px;
          display: flex;
          align-items: center;
          padding-left: 10px;
        }
      `}</style>
    </div>
  );
};

export default SearchResult;
