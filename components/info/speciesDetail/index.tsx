/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { AspectRatio } from "@chakra-ui/layout";
import React, { useMemo } from "react";
import { GREY_COLOR } from "../../../shared/color";
import CustomImage from "../../../shared/commonComponent/image";
import ListView from "../../../shared/commonComponent/listView";
import Spacing from "../../../shared/commonComponent/spacing";
import ErrorView from "../../errorView";
import useGetContentsDetail from "../hooks/useGetContentDetail";
import SpecBox, { ISpecData } from "../specBox";
const SPECIES_DETAIL_GAP = 20;

const FISH_SPEC_KEYS = {
  standard_length: "평균길이",
  aquarium_minimum_size: "최소어항크기",
  min_temperature: "최소물 온도",
  max_temperature: "최고물 온도",
};

const AQUAPLANT_SPEC_KEYS = {
  min_temperature: "최고물 온도",
  max_temperature: "최소물 온도",
  min_pH: "최소 PH",
  max_pH: "최대 PH",
};

const SUPPLIES_SPEC_KEYS = {
  manufacturer: "제조사",
  base_medicine: "기본 약품",
  standard_amount: "정량",
  input_amount: "투여량",
  input_unit: "단위",
};

//     'id' : 1
//     'category' : 'medicine',
//     'product_name' : '생선용 박카스',
//     'manufacturer' : '농심',
//     'manual_text' : '힘이 쑥쑥~',
//     'base_medicine': '카페인',
//     'standard_amount' : 100,
//     'input_amount' : 100,
//     'input_unit' : 'ml',
//     'disease' : '만성피로',
//     'spec' : '',
//     'pump_amount' : '',
//     'source' : '박지원 뇌',
//     'source_url' : 'fishhi.com',
//     'images' : [
//         {'image_url' : 'supplies_images_1.jpg'}
//     ],
//     'manual_images' : [
//         {'image_url' : 'supplies_manual_iamge_1.jpg'}
//     ]

// "id": 1,
// "name": "아누비아스 바테리",
// "min_temperature": 22,
// "max_temperature": 28,
// "min_pH": 6,
// "max_pH": 7,
// "description": "아누비아스 바테리는 나이지리아 남동부, 카메룬 및 비오코에서 서식합니다. 잎은 12인치(300mm)까지 자랄 수 있습니다. 아누비아스 바테리는 부분 혹은 완전 잠긴채로 자라고 강한 빛에서 잎이 더 빠르게 자라며 촘촘하게 유지되지만, 낮은 광량에서도 견딜 수 있습니다.",
// "source": null,
// "source_url": null,
// "images": [
//   {
//     "image_url": "naver.com",
//     "is_main": true
//   }
// ]

// "id": 1,
// "species": "금붕어",
// "standard_length": 5,
// "aquarium_minimum_size": 30,
// "min_temperature": 15,
// "max_temperature": 20,
// "min_pH": 5,
// "max_pH": 6,
// "description": "뒤돌면 까먹음.",
// "scientific_name": "과학적인 금붕어",
// "source": "test_site",
// "source_url": "test_url.com",
// "images": [
//   {
//     "image_url": "test2.jpg",
//     "is_main": false
//   },
//   {
//     "image_url": "test1.png",
//     "is_main": true
//   }
// ]

export interface ISpeciesDetailBaseData {
  title: string;
  description: string;
  image: string;
}
const SpeciesDetail = <T extends unknown>(props: { id: string; type: string; initData?: T }) => {
  const { type, id, initData } = props;
  const { data, error } = useGetContentsDetail(type, id, initData);
  const image = useMemo(() => {
    if (!data) return null;
    const { images } = data;
    if (!images || images.length < 1) return null;
    return images[0].image_url as string;
  }, [data]);

  const description = useMemo(() => {
    if (data) {
      if (type === "fish") {
        return data.description;
      }

      if (type === "aquaplant") {
        return data.description;
      }

      if (type === "supplies") {
        return data.manual_text;
      }
    }

    return null;
  }, [data, type]);

  const specKeys = useMemo(() => {
    if (type === "fish") return FISH_SPEC_KEYS;
    if (type === "aquaplant") return AQUAPLANT_SPEC_KEYS;
    if (type === "supplies") return SUPPLIES_SPEC_KEYS;
  }, [type]);

  const specList = useMemo(() => {
    if (data) {
      const temp: ISpecData[] = [];

      Object.entries(data).map(([key, value]) => {
        if (typeof key === "string" && (specKeys as any)[key])
          temp.push({
            name: (specKeys as any)[key] as string,
            spec: value as any,
          });
      });

      return temp;
    }

    return null;
  }, [data, specKeys]);
  if (error) return <ErrorView />;

  return (
    <div>
      {image && (
        <div className="species-image">
          <CustomImage src={image} width={"90%"} ratio={1 / 1} />
        </div>
      )}

      <pre className="description">{description}</pre>

      {specList && specList.length > 0 && (
        <>
          <p className="species-title">상세 정보</p>
          <div className="spec-list__wrapper">
            {specList?.map((specData, index) => {
              const { name, spec } = specData;
              return (
                <SpecBox
                  key={`specList${spec}${index}`}
                  name={name}
                  spec={spec}
                  color={GREY_COLOR}
                  specColor={"white"}
                  width={"100%"}
                  style={{
                    fontWeight: 700,
                    borderRadius: 5,
                  }}
                />
              );
            })}
          </div>
        </>
      )}

      <style jsx>{`
        .species-image {
          display: flex;
          justify-content: center;
        }

        .description {
          font-size: 13px;
          font-weight: 500;
        }

        .species-title {
          font-size: 16px;
          font-weight: 500;
          padding-top: 10px;
          padding-bottom: 10px;
        }
        .spec-list__wrapper {
          display: grid;
          grid-template-columns: repeat(2, 50%);
          column-gap: 20px;
          row-gap: 15px;
        }
      `}</style>
    </div>
  );
};

export default SpeciesDetail;

const SpecList = () => {};
