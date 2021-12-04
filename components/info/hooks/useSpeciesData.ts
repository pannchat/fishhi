import { useMemo } from "react";
import { DUMMY_DATA_LIST, FISH_LIST } from "../../../shared/dummy";

export function useSpeciesData(value: string) {
  const filteredData = (DUMMY_DATA_LIST as any)[value];

  return { dataList: filteredData.data };
}
