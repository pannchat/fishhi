import { useMemo } from "react";
import { FISH_LIST } from "../../../shared/dummy";

export function useInfoDetailHooks(value: string) {
  const data = FISH_LIST.data;
  const dataList = useMemo(() => {
    return data.filter((item) => value === item.species);
  }, [data]);

  return { dataList };
}
