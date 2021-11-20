import { FISH_LIST } from "../../../shared/dummy";

export default function useSpeciesDetailData(id: string) {
  const data = FISH_LIST.data;
  const detailData = data.filter((item) => id === String(item.id) )

  return {
    detailData
  }
}