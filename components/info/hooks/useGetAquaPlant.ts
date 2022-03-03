import { getAquaplantApi } from "../../../api";
import { IContentsParams } from "../../../shared/interface";
import useSWRInfinite from "swr/infinite";
export default function useGetAquaPlant(params?: IContentsParams) {
  const { data, error, size, setSize } = useSWRInfinite(
    index => `getAquaPlant${index}`,
    () => {
      if (params) return getAquaplantApi(params);
      return null;
    },
  );

  return {
    data,
    isLoading: !data && !error,
    size,
    setSize,
  };
}
