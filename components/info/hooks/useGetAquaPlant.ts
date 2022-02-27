import useSWR from "swr";
import { getAquaplantApi } from "../../../api";
import { IContentsParams } from "../../../shared/interface";

export default function useGetAquaPlant(params?: IContentsParams) {
  const { data, error } = useSWR(["useGetAquaPlant", params], () => {
    return getAquaplantApi(params);
  });

  return {
    data,
    error,
  };
}
