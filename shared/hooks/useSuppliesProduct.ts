import useSWR from 'swr';
import { getSuppliesProduct } from '../../api';

export interface ISupply {
  id: number;
  additionalExplanation: string;
  img: string;
  productName: string;
  recommendedUsage1: number;
  recommendedUsage2: number;
  searchWords: string[];
}

export interface IGetSuppliesProductResponse {
  item: ISupply[];
}

export function useSuppliesProduct(initData?: IGetSuppliesProductResponse) {
  const { data, error } = useSWR('useGetSuppliesProduct', () => getSuppliesProduct(), { fallbackData: initData });

  return {
    data: data ? data.item : null,
    error,
  };
}
