import { useRouter } from "next/dist/client/router";
import React from "react";
import Info from "../../components/info";

const InfoPageDetail = () => {
  const router = useRouter();
  const { param } = router.query;
  const species = param ? param[0] : null;
  return <div className="info-page"></div>;
};

export default InfoPageDetail;
