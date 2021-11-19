import React from "react";
import { useInfoDetailHooks } from "../../../pages/info/hooks/useInfoDetailHooks";
import { IFishListData } from "../../../shared/dummy";

const InfoDetail = (props: string) => {
  const { dataList } = useInfoDetailHooks(props);
  return <div></div>;
};

export default InfoDetail;

const InfoDetailItem = (props: IFishListData) => {
  return (
    <div className="info-detail-item">
      <style jsx>{`
        .info-detail-item {
          width: 90%;
          height: 300px;
          margin-left: auto;
          margin-right: auto;
          border: 1px solid #d2d2d2;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};
