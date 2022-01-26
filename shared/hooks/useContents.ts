import { useMemo } from 'react';
import useSWR from 'swr';
import { getAquaplant, getFishListApi } from '../../api';
import { ISpecies, ISpeciesList } from '../interface';

export interface IFish {
  id: number;
  species: string;
  description: string;
  thumbnail: string;
}

export default function useContents(type: string, initData?: any) {
  const { data, error } = useSWR(
    `contents_${type}`,
    () => {
      if (type === 'aquaplant') {
        return getAquaplant();
      }

      if (type === 'fish') {
        return getFishListApi();
      }

      return null;
    },
    { fallbackData: initData },
  );

  const contentsData = useMemo(() => {
    const tempData: ISpecies[] = [];
    if (data && type === 'aquaplant') {
      data.map((spec: any) => {
        const { id, min_pH, max_pH, name, images, max_temperature, min_temperature, description } = spec;

        tempData.push({
          id: id,
          name: name,
          thumbnail: images && images.length > 0 ? images[0].image_url : '',
          description: description,
          minPH: min_pH,
          maxPH: max_pH,
          maxTemperature: max_temperature,
          minTemperature: min_temperature,
        });
      });
    }

    if (data && type === 'fish') {
      data.map((fish: IFish, index: number) => {
        const { id, species, thumbnail, description } = fish;
        tempData.push({
          id: id,
          name: species,
          thumbnail: thumbnail || '',
          description: description,
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
