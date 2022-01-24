import { useMemo } from 'react';
import useSWR from 'swr';
import { getAquaplantDetail, getSuppliesApi } from '../../../api';
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
  const { data, error } = useSWR(['useContentDetail', id, type], () => {
    if (type === 'aquaplant') {
      return getAquaplantDetail(id);
    }

    return null;
  });

  const base = useMemo(() => {
    if (data) {
      const { id, name, images } = data;

      return {
        id,
        name,
        thumbnail: images,
      } as ISpeciesBaseInfo;
    }

    return null;
  }, [data]);

  const spec = useMemo(() => {
    if (data) {
      const { min_pH, max_pH, min_temperature, max_temperature } = data;
      return {
        minPH: min_pH,
        maxPH: max_pH,
        minTemperature: min_temperature,
        maxTemperature: max_temperature,
      } as ISpeciesDetailInfo;
    }
    return null;
  }, [data]);

  const refinedDescription = useMemo(() => {
    if (data) {
      const { description } = data;
      return description.split(`\n`);
    }
    return [''];
  }, [data]);
  return {
    base,
    spec,
    description: refinedDescription,
  } as ISpeciesDetailProps;
}
