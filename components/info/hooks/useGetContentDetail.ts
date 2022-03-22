import { useMemo } from "react";
import useSWR from "swr";
import { getAquaplantRetriveApi, getFishRetriveApi, getSupplyRetriveApi } from "../../../api";
import { IFishRetriveData } from "../../../shared/interface";

export default function useGetContentsDetail(type: string, id: string, initData?: any) {
  const { data, error } = useSWR(
    ["useGetContentsDetail", type, id],
    () => {
      if (type === "fish") return getFishRetriveApi(id);
      if (type === "aquaplant") return getAquaplantRetriveApi(id);
      if (type === "supplies") return getSupplyRetriveApi(id);
      return null;
    },
    {
      fallbackData: initData,
    },
  );

  const refinedData = useMemo(() => {
    if (data) {
      if (type === "fish") {
        const tempData = data as IFishRetriveData;
        const { standard_length, aquarium_minimum_size, min_temperature, max_temperature, max_pH, min_pH } = tempData;
      }
    }
  }, [data, type]);

  return {
    data,
    error,
  };
}
