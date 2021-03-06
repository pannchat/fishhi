import { useMemo } from "react";
import useSWR from "swr";

import { getAquaplantApi, getFishListApi, getSupplies } from "../../api";
import { IContentsParams, ISpecies, ISpeciesList, ISuppliesItem } from "../interface";

export interface ISupplyListItem {
  id: number;
  product_name: string;
  thumbnail: string;
}

export interface IFishListItem {
  id: number;
  species: string;
  thumbnail: string;
  description?: string;
}

export interface IFishListResponse {
  count: number;
  next: any;
  previous: any;
  result: IFishListItem[];
}

export interface ISupply {
  id: number;
  category: string;
  product_name: string;
  manufacturer: string;
  manual_text: string;
  base_medicine: string;
  standard_amount: number;
  input_amount: number;
  input_unit: string;
  disease: string;
  spec: string;
  pump_amount: string;
  source: string;
  source_url: string;
  images: {
    image_url: string[];
  };
  manual_images: {
    image_url: string[];
  };
}

export default function useContents(type: string, initData?: any, params?: IContentsParams) {
  const { data, error } = useSWR(
    [`contents`, type, params],
    () => {
      if (type === "aquaplant") {
        return getAquaplantApi(params);
      }

      if (type === "fish") {
        return getFishListApi();
      }

      if (type === "supplies") {
        return getSupplies(params);
      }

      return null;
    },
    { fallbackData: initData },
  );

  interface IContentData {
    id: number;
    product_name: string;
    thumbnail?: string | null;
  }

  const contentsData = useMemo(() => {
    const tempData: ISpecies[] = [];
    if (data && type === "aquaplant") {
      data.map((spec: any) => {
        const { id, min_pH, max_pH, name, images, max_temperature, min_temperature, description } = spec;

        tempData.push({
          id: id,
          name: name,
          thumbnail: images && images.length > 0 ? images[0].image_url : "",
          description: description,
          minPH: min_pH,
          maxPH: max_pH,
          maxTemperature: max_temperature,
          minTemperature: min_temperature,
        });
      });
    }

    if (data && type === "fish") {
      data.map((fish: IFishListItem, index: number) => {
        const { id, species, thumbnail, description } = fish;
        tempData.push({
          id: id,
          name: species,
          thumbnail: thumbnail || "",
          description: description,
        });
      });
    }

    // ?????? api
    if (data && type === "supplies") {
      data.map((supply: IContentData, index: number) => {
        const { id, product_name, thumbnail } = supply;
        tempData.push({
          id: id,
          name: product_name,
          thumbnail: thumbnail || "",
        });
      });
    }

    return tempData;
  }, [data, type]);

  return {
    data: contentsData.length > 0 ? contentsData : null,
    species: type,
  } as ISpeciesList;
}
