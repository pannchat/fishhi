/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useMemo } from "react";
import { GREY_COLOR } from "../../../shared/color";
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
const SpeciesDetail = <T extends unknown>(props: { id: string; type: string; initData?: T }) => {
  const { type, id, initData } = props;
  const { data, error } = useGetContentsDetail(type, id, initData);

  const specKeys = useMemo(() => {
    if (type === "fish") return FISH_SPEC_KEYS;
    if (type === "aquaplant") return AQUAPLANT_SPEC_KEYS;
  }, [type]);
  const specList = useMemo(() => {
    console.log("data => ", data);
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
  console.log("specList => ", specList);
  return (
    <div>
      <div>
        {specList?.map((specData, index) => {
          const { name, spec } = specData;
          return (
            <SpecBox
              key={`specList${spec}${index}`}
              name={name}
              spec={spec}
              color={GREY_COLOR}
              specColor={"white"}
              width={"40%"}
              height={50}
              style={{
                fontWeight: 700,
                borderRadius: 5,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SpeciesDetail;

const SpecList = () => {};
