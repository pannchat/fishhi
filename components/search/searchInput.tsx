import React, { useCallback, useState } from "react";
import { useRecoilState } from "recoil";
import Input, { IInputProps } from "../../shared/commonComponent/input";
import { searchSuggestionState, searchTextState } from "./stores/searchData";

export interface ISearchKeywordProps {
  id: number;
  name: string;
  keyword: string[];
}

export interface ISearchKeywordData {
  data: ISearchKeywordProps[];
}

export interface ISearchInputProps extends IInputProps {}
const SEARCH_KEYWORD_1: ISearchKeywordData = {
  data: [
    { id: 1, name: "라쿤 타이거 새우", keyword: ["비쉬림프", "쉬림프"] },
    { id: 2, name: "오렌지 타이거 새우", keyword: ["비쉬림프"] },
    { id: 3, name: "크리스탈 화이트 새우", keyword: ["오토신"] },
    { id: 5, name: "다리오다리오", keyword: ["스칼렛바디스"] },
    { id: 6, name: "아프리카발톱개구리", keyword: ["똥고기"] },
    { id: 7, name: "구라미", keyword: ["똥고기"] },
    { id: 8, name: "코리도라스 하스타투스", keyword: ["Corydoras hastatus"] },
    {
      id: 9,
      name: "코리도라스 듀프리카레우스",
      keyword: ["Corydoras duplicareus", "듀플리"],
    },
    { id: 10, name: "코리도라스 스터바이", keyword: ["Corydoras sterbai"] },
  ],
};
const SEARCH_KEYWORD_2 = {
  data: [
    {
      id: 1,
      name: "아누비아스 나나",
      keyword: ["비쉬림프", "쉬림프"],
      classification: "plant",
    },
  ],
};

const SearchInput = () => {
  const [text, setText] = useRecoilState<string>(searchTextState);
  const [suggestion, setSuggestion] = useRecoilState<ISearchKeywordProps[]>(
    searchSuggestionState
  );
  const data = [...SEARCH_KEYWORD_1.data, ...SEARCH_KEYWORD_2.data];
  const onChangeHandler = useCallback(
    (text: string) => {
      let matches: ISearchKeywordProps[] = [];
      let matches2: ISearchKeywordProps[] = [];
      text = text.replace("\\", "");
      if (text.length > 0) {
        matches = data.filter((dt) => {
          const regex = new RegExp(`${text}`, "gi");
          // var test = [...dt.email,...dt.first_name];

          return dt.name.match(regex);
        });
      }
      if (text.length > 0) {
        matches2 = data.filter((dt) => {
          const regex = new RegExp(`\\${text}`, "gi");
          // var test = [...dt.email,...dt.first_name];
          let test = null;
          dt.keyword.map((e) => {
            if (e.match(regex)) {
              test = dt.keyword;
              return;
            }
          });

          return test;
        });
      }
      var result = new Set([...matches, ...matches2]); // 중복제거

      setSuggestion([...result]);
      if (text.length > 0 && result.size > 0) {
      }
      setText(text);
    },
    [text, suggestion]
  );
  return (
    <Input
      placeholder="검색어를 입력하세요"
      value={text}
      onChange={(e) => {
        onChangeHandler(e.target.value);
      }}
      style={{
        width: "100%",
        border: `1px solid #d2d2d2`,
        borderRadius: 10,
        height: 50,
        fontSize: 16,
        paddingLeft: 10,
      }}
    />
  );
};

export default SearchInput;
