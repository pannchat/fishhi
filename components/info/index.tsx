import React from "react";
import CategoryList from "../../shared/commonComponent/category";
import { useFishList } from "../../shared/hooks/useFishList";

const INFO_CATEGORY_DUMMY = [
  {
    id: "fish",
    label: "어종",
  },
  {
    id: "waterPlant",
    label: "수초",
  },
  {
    id: "medicine",
    label: "약품",
  },
];
const Info = () => {
  return (
    <div className="info__wrapper">
      <h1 className="info-title">fishHi백과</h1>
      <h4 className="info-subtitle">
        찾고 싶은 카테고리를
        <br />
        선택해 주세요.
      </h4>
      <CategoryList data={INFO_CATEGORY_DUMMY} />
      <style jsx>{`
        .info-title {
          font-size: 20px;
          padding-top: 10px;
          padding-left: 10px;
        }

        .info-subtitle {
          font-weight: 400;
          font-size: 18px;
          padding-top: 10px;
          padding-left: 10px;
        }
      `}</style>
    </div>
  );
};

export default Info;
