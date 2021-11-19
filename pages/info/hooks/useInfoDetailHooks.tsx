import { useMemo } from "react";
import { FISH_LIST } from "../../../shared/dummy";

export function useInfoDetailHooks(value: string) {
  const data = FISH_LIST.data;
  const dataList = useMemo(() => {
    return data.map((item) => {
      if (value === item.species) {
        return value;
      }
    });
  }, [data]);

  return { dataList };
}
