import React from "react";
import useSpeciesDetailData, {
  SpeciesBaseInfo,
} from "../hooks/useSpeciesDetailData";

const SpeciesDetail = (props: { id: string }) => {
  const { id } = props;
  const { detailData } = useSpeciesDetailData(id);
  console.log(detailData);
  if (!detailData) return null;
  const { base } = detailData;
  return (
    <div>
      <SpeciesDetailBase data={base} />
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
