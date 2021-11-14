import useSWR from "swr";
import { getSuppliesProduct } from "../../api";

export function useSuppliesProduct() {
  const {data, error} = useSWR('useGetSuppliesProduct', 
  () => getSuppliesProduct());

  return {
    data: data ? data.item : null,
    error,
  }
}