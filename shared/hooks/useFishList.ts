import useSWR from "swr";
import { getFishListApi } from "../../api";

export function useFishList() {
  const { data, error } = useSWR('useFishList', getFishListApi);
  
  return {
    data
  }
}