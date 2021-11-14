import React from "react";
import { useFishList } from "../../shared/hooks/useFishList";

const Info = () => {
  useFishList();
  return (
    <div className="info__wrapper">
      <h1>어항 백과</h1>
    </div>
  );
};

export default Info;
