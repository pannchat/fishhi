import React from "react";
import { useInfoDetailHooks } from "../../../pages/info/hooks/useInfoDetailHooks";
import ListView from "../../../shared/commonComponent/listView";
import { IFishListData } from "../../../shared/dummy";
import useMouseHover from "../../../shared/hooks/useMouseHover";

const InfoDetail = (props: { species: string }) => {
  const { species } = props;
  const { dataList } = useInfoDetailHooks(species);
  return (
    <div>
      <ListView
        list={dataList}
        column={2}
        columnSize={"50%"}
        gap={10}
        ListItem={(props: IFishListData) => <InfoDetailItem {...props} />}
      />
    </div>
  );
};

export default InfoDetail;

export const InfoDetailItem = (props: IFishListData) => {
  const { isHover, onMouseEnterHandler, onMouseLeaveHandler } = useMouseHover();
  const { thumbnail, name } = props;
  console.log(props);

  return (
    <div className="info-detail-item">
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
      ;
      <style jsx>{`
        .info-detail-item {
          width: 90%;
          height: 300px;
          margin-left: auto;
          margin-right: auto;
          border: 1px solid #d2d2d2;
          border-radius: 10px;
        }

        .info-detail-item-thumbnail {
          position: relative;
          padding-bottom: 66%;
          overflow: hidden;
        }

        .item__image {
          position: absolute;
          top: 0;
          left: 0;
        }

        .info-detail-item__title {
          font-size: 17px;
          font-weight: 700;
        }
      `}</style>
    </div>
  );
};
