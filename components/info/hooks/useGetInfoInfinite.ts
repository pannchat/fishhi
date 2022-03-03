import { IAquaplant, IContentsParams, ISuppliesItem } from "../../../shared/interface";
import useSWRInfinite from "swr/infinite";
import { getAquaplantApi, getFishListApi, getSupplies } from "../../../api";
import { IFishListResponse } from "../../../shared/hooks/useContents";
interface IUseGetInfoInfiniteProps {
  type: string;
  params?: IContentsParams;
}

export default function useGetInfoInfinite(props: IUseGetInfoInfiniteProps) {
  const { type, params } = props;
  const { data, error, size, setSize } = useSWRInfinite<IAquaplant[] | ISuppliesItem | IFishListResponse | null>(
    index => [type, params, index, "useGetInfoInfinite"],
    () => {
      if (type === "fish") return getFishListApi(params);
      if (type === "aquaplant") return getAquaplantApi(params);
      if (type === "supplies") return getSupplies(params);

      return null;
    },
  );

  console.log(data);

  return {
    data,
    isLoading: !data && !error,
    size,
    setSize,
  };
}
