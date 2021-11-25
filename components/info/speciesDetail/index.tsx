import React, { useMemo } from "react";
import ListView from "../../../shared/commonComponent/listView";
import Spacing from "../../../shared/commonComponent/spacing";
import useSpeciesDetailData, {
  SpeciesBaseInfo,
  SpeciesSpecInfo,
  SPECIES_NAME,
} from "../hooks/useSpeciesDetailData";
import SpecBox from "../specBox";
const SPECIES_DETAIL_GAP = 20;
const SpeciesDetail = (props: { id: string }) => {
  const { id } = props;
  const { detailData } = useSpeciesDetailData(id);

  if (!detailData) return null;
  const { base, spec, description } = detailData;
  return (
    <div>
      <SpeciesDetailBase data={base} />
      <Spacing height={SPECIES_DETAIL_GAP} />
      <SpeciesDetailSpecs data={spec} title="어종 정보" />
      <Spacing height={SPECIES_DETAIL_GAP} />
      <SpeciesDetailDescription description={description} />
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
  id: string;
  value: SpeciesBaseInfoKeys;
}

const SpeciesDetailSpecs = (props: {
  data: SpeciesSpecInfo;
  title: string;
}) => {
  const { data, title } = props;
  const keys = Object.keys(data);
  const specs = useMemo(() => {
    let tempSpecs: ISpeciesDetailSpecData[] = [];
    keys.map((specKey) => {
      tempSpecs.push({
        id: specKey,
        value: (data as any)[specKey],
      } as ISpeciesDetailSpecData);
    });

    if (tempSpecs.length > 0) return tempSpecs;
    return null;
  }, [keys, data]);
  if (!specs) return null;

  return (
    <div className="species-detail-specs">
      <h3>{title}</h3>
      <ListView
        list={specs}
        ListItem={(props: ISpeciesDetailSpecData) => {
          return (
            <SpecBox
              name={(SPECIES_NAME as any)[props.id]}
              spec={props.value}
              width="100%"
              height={50}
              color={"#d2d2d2"}
              specColor="white"
            />
          );
        }}
        column={2}
        columnSize="50%"
        gap={20}
      />
    </div>
  );
};

const SpeciesDetailDescription = (props: { description: string[] }) => {
  const { description } = props;
  return (
    <div className="species-detail-description">
      <h3 className="species-detail-title">세부 사항</h3>
      <div className="species-detail-text__wrapper">
        {description.map((value, index) => (
          <div
            key={index}
            style={{
              marginBottom: 20,
            }}
          >
            <p
              style={{
                lineHeight: 1.6,
              }}
            >
              {value}
            </p>
          </div>
        ))}
      </div>

      <style jsx>{`
        .species-detail-description {
          padding-top: 10px;
          padding-bottom: 10px;
          background-color: #f3f4f5;
          border-radius: 15px;
        }

        .species-detail-text__wrapper {
          width: 90%;
          margin-left: auto;
          margin-right: auto;
        }

        .species-detail-title {
          padding-left: 10px;
        }
      `}</style>
    </div>
  );
};
