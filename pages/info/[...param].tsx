import { useRouter } from "next/dist/client/router";
import React from "react";
import Info from "../../components/info";
import InfoDetail from "../../components/info/detail";

const InfoPageDetail = () => {
  const router = useRouter();
  const { param } = router.query;
  const species = param ? param[0] : null;

  if (!species) return null;
  return <InfoDetail species={species} />;
};

export default InfoPageDetail;
