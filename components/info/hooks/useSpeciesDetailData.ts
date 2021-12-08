import { useMemo } from 'react';
import useContents from '../../../shared/hooks/useContents';
import { ISpecies } from '../../../shared/interface';

export interface ISpeciesBaseInfo extends Pick<ISpecies, 'id' | 'name' | 'thumbnail'> {}

export interface ISpeciesDetailInfo extends Pick<ISpecies, 'minPH' | 'maxPH' | 'minTemperature' | 'maxTemperature'> {}

export interface ISpeciesDetailProps {
  base: ISpeciesBaseInfo | null;
  spec: ISpeciesDetailInfo | null;
  description: string[] | null;
}

export const SPECIES_NAME = {
  maxPH: 'max PH',
  minPH: 'min PH',
  minTemperature: '최소 온도',
  maxTemperature: '최대 온도',
  standardLength: '평균 길이',
};

export default function useSpeciesDetailData(id: string, type: string): ISpeciesDetailProps {
  const { data } = useContents(type);
  const filteredData = useMemo(() => {
    if (data && data.length > 0) {
      return data.filter(dataItem => String(dataItem.id) === id)[0];
    }
    return null;
  }, [data, id]);

  const base = useMemo(() => {
    if (filteredData) {
      const { id, name, thumbnail } = filteredData;
      return {
        id,
        name,
        thumbnail,
      } as ISpeciesBaseInfo;
    }

    return null;
  }, [filteredData]);

  const spec = useMemo(() => {
    if (filteredData) {
      const { minPH, maxPH, minTemperature, maxTemperature } = filteredData;
      return {
        minPH,
        maxPH,
        minTemperature,
        maxTemperature,
      } as ISpeciesDetailInfo;
    }
    return null;
  }, [filteredData]);

  const refinedDescription = useMemo(() => {
    if (filteredData) {
      const { description } = filteredData;
      return description.split(`\n`);
    }
    return [''];
  }, [filteredData]);
  return {
    base,
    spec,
    description: refinedDescription,
  } as ISpeciesDetailProps;
}
