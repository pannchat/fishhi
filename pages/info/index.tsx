import { useRouter } from "next/dist/client/router";
import React from "react";
import Info from "../../components/info";

const InfoPage = () => {
  const router = useRouter();

  return (
    <div className="info-page">
      <Info />
    </div>
  );
};

export default InfoPage;
