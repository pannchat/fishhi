import { IAquaplant, IContentsItem, IContentsParams, ISuppliesItem } from "../../../shared/interface";
import useSWRInfinite from "swr/infinite";
import { getAquaplantApi, getFishListApi, getSupplies } from "../../../api";
import { IFishListResponse } from "../../../shared/hooks/useContents";
import { IInitData } from "../../contents";
import { useEffect, useMemo } from "react";
interface IUseGetInfoInfiniteProps {
  type: string;
  params?: IContentsParams;
  initData?: IUseGetInfoInfiniteResponse;
}

export interface IUseGetInfoInfiniteResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IContentsItem[];
}
// WIP
export default function useGetInfoInfinite(props: IUseGetInfoInfiniteProps) {
  const { type, params, initData } = props;

  const refinedInitData = useMemo(() => {
    if (initData) {
      return [initData];
    }

    return undefined;
  }, [initData]);

  const { data, error, size, setSize } = useSWRInfinite<IUseGetInfoInfiniteResponse | null | undefined>(
    index => [index, type, params, "useGetInfoInfinite"],
    async index => {
      const curIndex = index as number;

      if (type === "fish") {
        return getFishListApi({ offset: curIndex * 10, limit: 10 });
      }
      if (type === "aquaplant") {
        return getAquaplantApi({ offset: curIndex * 10, limit: 10 });
      }
      if (type === "supplies") {
        return getSupplies({ offset: curIndex * 10, limit: 10 });
      }

      return null;
    },

    { fallbackData: refinedInitData, revalidateFirstPage: false },
  );

  return {
    data,
    isLoading: !data && !error,
    size,
    setSize,
  };
}
