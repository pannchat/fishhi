import { useMemo } from 'react';
import useSWR from 'swr';
import { getAquaplant } from '../../api';
import { ISpecies, ISpeciesList } from '../interface';

export default function useContents(type: string) {
  const { data, error } = useSWR(`contents_${type}`, () => {
    if (type === 'aquaplant') {
      return getAquaplant();
    }

    return null;
  });

  const contentsData = useMemo(() => {
    const tempData: ISpecies[] = [];
    if (data) {
      data.map(spec => {
        const { id, min_pH, max_pH, name, images, max_temperature, min_temperature, description } = spec;
        tempData.push({
          id: id,
          name: name,
          thumbnail: images,
          description: description,
          minPH: min_pH,
          maxPH: max_pH,
          maxTemperature: max_temperature,
          minTemperature: min_temperature,
        });
      });
    }

    return tempData;
  }, [data]);

  return {
    data: contentsData.length > 0 ? contentsData : null,
    species: type,
  } as ISpeciesList;
}
