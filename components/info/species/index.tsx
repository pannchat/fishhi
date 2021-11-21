import React from "react";
import { useSpeciesData } from "../hooks/useSpeciesData";
import ListView from "../../../shared/commonComponent/listView";
import { IFishListData } from "../../../shared/dummy";
import useMouseHover from "../../../shared/hooks/useMouseHover";

const Species = (props: { species: string }) => {
  const { species } = props;
  const { dataList } = useSpeciesData(species);
  return (
    <div>
      <ListView
        list={dataList}
        column={2}
        columnSize={"50%"}
        gap={10}
        ListItem={(props: IFishListData) => <SpeciesItem {...props} />}
      />
    </div>
  );
};

export default Species;

export const SpeciesItem = (props: IFishListData) => {
  const { isHover, onMouseEnterHandler, onMouseLeaveHandler } = useMouseHover();
  const { thumbnail, name } = props;
  console.log(props);

  return (
    <div
      className="info-detail-item"
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
    >
      <div className="info-detail-item-thumbnail">
        <img
          className="item__image"
          src={thumbnail}
          width={"100%"}
          height={"100%"}
        />
      </div>
      <div className="info-detail-item-description">
        <p className="info-detail-item__title">{name}</p>
      </div>

      <style jsx>{`
        .info-detail-item {
          width: 90%;
          margin-left: auto;
          margin-right: auto;
          cursor: pointer;
        }

        .info-detail-item-thumbnail {
          position: relative;
          padding-bottom: 66%;
          overflow: hidden;
          border: 1px solid #d2d2d2;
          border-radius: 10px;
        }

        .item__image {
          position: absolute;
          top: 0;
          left: 0;

          transform: scale(${isHover ? 1.2 : 1});
          transition: transform 0.3s ease;
        }

        .info-detail-item__title {
          font-size: 14px;
          font-weight: 700;
          text-align: center;
          margin-top: 5px;
          text-decoration: ${isHover ? "underline" : "none"};
        }
      `}</style>
    </div>
  );
};
