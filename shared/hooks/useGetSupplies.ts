import useSWR from "swr";
import { getSupplies } from "../../api";
import { IContentsParams } from "../interface";

export default function useGetSupplies(params?: IContentsParams) {
  const { data, error } = useSWR([`useGetSupplies`, params], () => {
    return getSupplies(params);
  });

  return data;
}
