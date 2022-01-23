/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useMemo } from 'react';
import ListView from '../../../shared/commonComponent/listView';
import Spacing from '../../../shared/commonComponent/spacing';
import useSpeciesDetailData, {
  ISpeciesBaseInfo,
  ISpeciesDetailInfo,
  SPECIES_NAME,
} from '../hooks/useSpeciesDetailData';
import SpecBox from '../specBox';
const SPECIES_DETAIL_GAP = 20;
const SpeciesDetail = (props: { id: string; type: string }) => {
  const { id, type } = props;
  const { base, spec, description } = useSpeciesDetailData(id, type);

  if (!base || !spec || !description) return null;

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

const SpeciesDetailBase = (props: { data: ISpeciesBaseInfo }) => {
  const { name, thumbnail } = props.data;
  return (
    <div className="species-detail-base">
      <h1 className="species-detail-title"> {name} </h1>
      <div className="species-detail-image">
        {thumbnail.map((value, index) => {
          const { image_url } = value;
          return <img key={`speciesDetailImage${index}`} className="detail-image" src={image_url} height="100%" />;
        })}
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
          transform: translate(-50%, -50%);
          top: 50%;
          left: 50%;
        }
      `}</style>
    </div>
  );
};

type ISpeciesBaseInfoKeys = keyof ISpeciesDetailInfo;

interface ISpeciesDetailSpecData {
  id: string;
  value: ISpeciesBaseInfoKeys;
}

const SpeciesDetailSpecs = (props: { data: ISpeciesDetailInfo; title: string }) => {
  const { data, title } = props;
  const keys = Object.keys(data);
  const specs = useMemo(() => {
    let tempSpecs: ISpeciesDetailSpecData[] = [];
    keys.map(specKey => {
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
              color={'#d2d2d2'}
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
