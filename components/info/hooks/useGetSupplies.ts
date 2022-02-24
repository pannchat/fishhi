import useSWR from "swr";
import { getSupplies } from "../../../api";

export interface ISuppliesParams {
  offset?: number;
  limit?: number;
}

export default function useGetSupplies(param?: ISuppliesParams) {
  const { data, error } = useSWR(`getSupplies${param}`, () => {
    return getSupplies();
  });

  return {
    suppliesData: data,
    getSuppliesError: error,
  };
}
