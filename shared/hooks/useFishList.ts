import useSWR from "swr";
import { getFishListApi } from "../../api";

export default function useFishList(){
  const { data, error } = useSWR('useFishList', getFishListApi);
  
  return {
    data
  }
}