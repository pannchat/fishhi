import React, { useMemo } from "react";
import ListView from "../../../shared/commonComponent/listView";
import Spacing from "../../../shared/commonComponent/spacing";
import useSpeciesDetailData, {
  SpeciesBaseInfo,
  SpeciesSpecInfo,
} from "../hooks/useSpeciesDetailData";
import SpecBox from "../specBox";

const SpeciesDetail = (props: { id: string }) => {
  const { id } = props;
  const { detailData } = useSpeciesDetailData(id);
  console.log(detailData);
  if (!detailData) return null;
  const { base, spec } = detailData;
  return (
    <div>
      <SpeciesDetailBase data={base} />
      <Spacing height={20} />
      <SpeciesDetailSpecs data={spec} />
    </div>
  );
};

export default SpeciesDetail;

const SpeciesDetailBase = (props: { data: SpeciesBaseInfo }) => {
  const { name, thumbnail, species } = props.data;

  return (
    <div className="species-detail-base">
      <h1 className="species-detail-title"> {name} </h1>
      <div className="species-detail-image">
        <img
          className="detail-image"
          src={thumbnail}
          width="100%"
          height="100%"
        />
      </div>

      <style jsx>{`
        .species-detail-title {
          fons-size: 18px;
          font-weight: 700;
        }

        .species-detail-image {
          position: relative;
          padding-bottom: 60%;
          overflow: hidden;
          border-radius: 10px;
        }

        .detail-image {
          position: absolute;
          top: 0;
          left: 0;
        }
      `}</style>
    </div>
  );
};

type SpeciesBaseInfoKeys = keyof SpeciesSpecInfo;

interface ISpeciesDetailSpecData {
  key: string;
  value: SpeciesBaseInfoKeys;
}

const SpeciesDetailSpecs = (props: { data: SpeciesSpecInfo }) => {
  const { data } = props;
  const keys = Object.keys(data);
  const specs = useMemo(() => {
    let tempSpecs: ISpeciesDetailSpecData[] = [];
    keys.map((specKey) => {
      tempSpecs.push({
        key: specKey,
        value: (data as any)[specKey],
      } as ISpeciesDetailSpecData);
    });

    if (tempSpecs.length > 0) return tempSpecs;
    return null;
  }, [keys, data]);
  if (!specs) return null;
  return (
    <div className="species-detail-specs">
      <ListView
        list={specs}
        ListItem={(props: ISpeciesDetailSpecData) => (
          <SpecBox
            name={props.key}
            spec={props.value}
            width="100%"
            height={50}
            color={"#d2d2d2"}
            specColor="white"
          />
        )}
        column={2}
        columnSize="50%"
        gap={20}
      />
    </div>
  );
};
