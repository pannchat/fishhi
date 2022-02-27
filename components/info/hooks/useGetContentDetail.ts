import useSWR from "swr";
import { getAquaplantRetriveApi, getFishRetriveApi, getSupplyRetriveApi } from "../../../api";

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

  return {
    data,
    error,
  };
}
