import { IAquaplant, IContentsParams, ISuppliesItem } from "../../../shared/interface";
import useSWRInfinite from "swr/infinite";
import { getAquaplantApi, getFishListApi, getSupplies } from "../../../api";
import { IFishListResponse } from "../../../shared/hooks/useContents";
interface IUseGetInfoInfiniteProps {
  type: string;
  params?: IContentsParams;
}
// WIP
export default function useGetInfoInfinite(props: IUseGetInfoInfiniteProps) {
  const { type, params } = props;
  const { data, error, size, setSize } = useSWRInfinite<IAquaplant[] | ISuppliesItem | IFishListResponse | null>(
    index => [index, type, params, "useGetInfoInfinite"],
    index => {
      const curIndex = index as number;
      console.log("### curIndex => ", curIndex);
      if (type === "fish") return getFishListApi({ limit: 10 });
      if (type === "aquaplant") return getAquaplantApi(params);
      if (type === "supplies") return getSupplies(params);

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
