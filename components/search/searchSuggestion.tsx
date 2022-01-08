import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { searchFocusState, searchSuggestionState, searchTextState } from './stores/searchData';

export interface ISearchSuggestionProps {
  width?: string | number;
}
const SearchSuggestion = (props: ISearchSuggestionProps) => {
  const { width = '100%' } = props;
  const suggestion = useRecoilValue(searchSuggestionState);
  const [searchText, setSearchText] = useRecoilState(searchTextState);
  const searchFocus = useRecoilValue(searchFocusState);
  const showSuggenstion = searchText.length > 0 && searchFocus;
  const onClickHandler = (value: string) => {
    setSearchText(value);
  };
  return (
    <div
      className="search-suggestion__wrapper"
      style={{
        width: width,
      }}
    >
      {suggestion.length > 0 ? (
        suggestion.map((value, index) => {
          const { id, name } = value;
          return (
            <div
              key={`searchSuggestionItem${id}`}
              className="search-suggestion-item"
              onClick={() => {
                onClickHandler(name);
              }}
            >
              {name}
            </div>
          );
        })
      ) : (
        <p className="search-suggestion--no-suggestion">검색결과가 없습니다.</p>
      )}

      <style jsx>{`
        .search-suggestion__wrapper {
          position: absolute;
          top: 49px;
          height: ${showSuggenstion ? 'auto' : '0px'};
          background-color: white;
          width: 100%;
          border: ${showSuggenstion ? `1px solid #d2d2d2` : 'none'};
          opacity: ${showSuggenstion ? 1 : 0};
        }
        .search-suggestion-item {
          box-sizing: border-box;
          line-height: 50px;
          vertical-align: middle;
          font-size: 14px;
          padding-left: 10px;
          cursor: pointer;
        }

        .search-suggestion--no-suggestion {
          font-size: 16px;
          font-weight: 700;
          display: flex;
          align-items: center;
          padding-left: 10px;
          height: ${showSuggenstion ? '45px' : '0px'};
          transition: 0.3s ease opacity, 0.1s ease height;
        }
      `}</style>
    </div>
  );
};

export default SearchSuggestion;
