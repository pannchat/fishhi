import { useMemo } from "react";
import useSWR from "swr";
import { getAquaplant, getFishListApi, getSupplies } from "../../api";
import { ISpecies, ISpeciesList } from "../interface";

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

// {
//   'id' : 1
//   'category' : 'medicine',
//   'product_name' : '생선용 박카스',
//   'manufacturer' : '농심',
//   'manual_text' : '힘이 쑥쑥~',
//   'base_medicine': '카페인',
//   'standard_amount' : 100,
//   'input_amount' : 100,
//   'input_unit' : 'ml',
//   'disease' : '만성피로',
//   'spec' : '',
//   'pump_amount' : '',
//   'source' : '박지원 뇌',
//   'source_url' : 'fishhi.com',
//   'images' : [
//       {'image_url' : 'supplies_images_1.jpg'}
//   ],
//   'manual_images' : [
//       {'image_url' : 'supplies_manual_iamge_1.jpg'}
//   ]
// }

export default function useContents(type: string, initData?: any) {
  const { data, error } = useSWR(
    `contents_${type}`,
    () => {
      if (type === "aquaplant") {
        return getAquaplant();
      }

      if (type === "fish") {
        return getFishListApi();
      }

      if (type === "supplies") {
        return getSupplies();
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

    // 용품 api
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
