import { useMemo } from "react";
import { FISH_LIST, IFishListData } from "../../../shared/dummy";

export type SpeciesBaseInfo = {
  id: string;
  name: string;
  species: string;
  thumbnail: string
}

export type SpeciesSpecInfo = {
  minPH: number;
  maxPH: number;
  minTemperature: number;
  maxTemperature: number;
  standardLength: number;
}
export interface ISpeciesDetailProps {
  base: SpeciesBaseInfo;
  spec: SpeciesSpecInfo;
  description: string[];
}

export const SPECIES_NAME = {
  maxPH: 'max PH',
  minPH: 'min PH',
  minTemperature: '최소 온도',
  maxTemperature: '최대 온도',
  standardLength: '평균 길이',
}

export default function useSpeciesDetailData(id: string) {
  const data = FISH_LIST.data;
  const detailData = data.filter((item) => id === String(item.id) )
  const refinedDetailData = useMemo(() => {
    if(detailData.length > 0){
      const tempInfo = {} as ISpeciesDetailProps;
      const currentData = detailData[0];
      
      const { id, thumbnail, species, name, description, ...rest } = currentData;
      const base = {
        id: String(id),
        thumbnail: thumbnail,
        species: species,
        name: name,
      }
      const spec = {
        ...rest
      }
      const refinedDescription = description.split(/\r?\n/);
      tempInfo['description'] = refinedDescription;
      tempInfo['base'] = base;
      tempInfo['spec'] = spec
      return tempInfo;
    }

    return null
  }, [
    detailData
  ])
  return {
    detailData: refinedDetailData
  }
}