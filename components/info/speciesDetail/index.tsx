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

interface ISpeciesDetailData {}
const SpeciesDetail = <T extends unknown>(props: { id: string; type: string; initData?: T }) => {
  const { type, id, initData } = props;
  const { data, error } = useGetContentsDetail(type, id, initData);
  const image = useMemo(() => {
    if (!data) return null;
    const { images } = data;
    if (!images || images.length < 1) return null;
    return images[0].image_url as string;
  }, [data]);

  const specKeys = useMemo(() => {
    if (type === "fish") return FISH_SPEC_KEYS;
    if (type === "aquaplant") return AQUAPLANT_SPEC_KEYS;
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
        <div className="psecies-image">
          <CustomImage src={image} width={"90%"} ratio={1 / 1} />
        </div>
      )}

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
        .psecies-image {
          display: flex;
          justify-content: center;
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
