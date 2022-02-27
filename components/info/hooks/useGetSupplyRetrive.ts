import { useMemo } from "react";
import useSWR from "swr";
import { getSupplyRetriveApi } from "../../../api";

export default function useGetSupplyRetrive(id: string) {
  const { data, error } = useSWR(["useGetSupplyRetrive", id], () => {
    return getSupplyRetriveApi(id);
  });

  const refinedData = useMemo(() => {
    if (data) {
      const { images } = data;
    }
  }, [data, error]);
}
