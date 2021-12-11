import { debounce, throttle } from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import Input, { IInputProps } from '../../shared/commonComponent/input';
import LinkCustom from '../../shared/commonComponent/link';
import UrlPath from '../../shared/urlPath';
import { searchFocusState, searchSuggestionState, searchTextState } from './stores/searchData';

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
    { id: 1, name: '라쿤 타이거 새우', keyword: ['비쉬림프', '쉬림프'] },
    { id: 2, name: '오렌지 타이거 새우', keyword: ['비쉬림프'] },
    { id: 3, name: '크리스탈 화이트 새우', keyword: ['오토신'] },
    { id: 5, name: '다리오다리오', keyword: ['스칼렛바디스'] },
    { id: 6, name: '아프리카발톱개구리', keyword: ['똥고기'] },
    { id: 7, name: '구라미', keyword: ['똥고기'] },
    { id: 8, name: '코리도라스 하스타투스', keyword: ['Corydoras hastatus'] },
    {
      id: 9,
      name: '코리도라스 듀프리카레우스',
      keyword: ['Corydoras duplicareus', '듀플리'],
    },
    { id: 10, name: '코리도라스 스터바이', keyword: ['Corydoras sterbai'] },
  ],
};
const SEARCH_KEYWORD_2 = {
  data: [
    {
      id: 1,
      name: '아누비아스 나나',
      keyword: ['비쉬림프', '쉬림프'],
      classification: 'plant',
    },
  ],
};

const SearchInput = () => {
  const [text, setText] = useRecoilState<string>(searchTextState);
  const url = text && text.length > 0 ? UrlPath.Search + `?searchText=${text}` : '';
  const [suggestion, setSuggestion] = useRecoilState<ISearchKeywordProps[]>(searchSuggestionState);
  const setSearchFocus = useSetRecoilState(searchFocusState);
  const data = [...SEARCH_KEYWORD_1.data, ...SEARCH_KEYWORD_2.data];
  const linkRef = useRef<HTMLElement>(null);
  const onFocushandler = () => {
    setSearchFocus(true);
  };

  const onBlurHandler = () => {
    setSearchFocus(false);
  };

  const onClickHandler = useCallback((e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();
  }, []);

  const onKeyPressHandler = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const key = e.key;
      if (key === 'Enter' && linkRef.current) {
        if (url.length > 0) {
          linkRef.current.click();
          return;
        }
        alert('검색어를 입력해 주세요');
      }
    },
    [linkRef, url],
  );
  const setSuggestionDebounce = useCallback(
    debounce(value => {
      let matches: ISearchKeywordProps[] = [];
      let matches2: ISearchKeywordProps[] = [];
      const text = value.replace('\\', '');
      console.log('debounce text =>', text);
      if (text.length > 0) {
        matches = data.filter(dt => {
          const regex = new RegExp(`${text}`, 'gi');

          return dt.name.match(regex);
        });
      }
      if (text.length > 0) {
        matches2 = data.filter(dt => {
          const regex = new RegExp(`\\${text}`, 'gi');
          let test = null;
          dt.keyword.map(e => {
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
    }, 300),
    [setSuggestion],
  );
  const onChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const text = e.target.value;
      setText(text);
      setSuggestionDebounce(text);
    },
    [setText, setSuggestionDebounce],
  );

  useEffect(() => {
    if (linkRef.current) {
      linkRef.current.addEventListener('event', e => {
        console.log(e);
      });
    }
  }, [linkRef]);
  return (
    <LinkCustom href={url} ref={linkRef}>
      <Input
        placeholder="검색어를 입력하세요"
        value={text}
        onClick={onClickHandler}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        onFocus={onFocushandler}
        onBlur={onBlurHandler}
        style={{
          width: '100%',
          border: `1px solid #d2d2d2`,
          borderRadius: 10,
          height: 50,
          fontSize: 16,
          paddingLeft: 10,
        }}
      />
    </LinkCustom>
  );
};

export default SearchInput;
