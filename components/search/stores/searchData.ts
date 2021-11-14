import { atom } from "recoil";
import { ISearchKeywordProps } from "../searchInput";



export const searchTextState = atom<string>({
  key: 'searchTextState',
  default: '',
})

export const searchSuggestionState = atom<ISearchKeywordProps[]>({
  key:  'searchSuggestionState',
  default: [],
})

export const searchFocusState = atom<boolean>({
  key: 'searchFocusState',
  default: false,
})