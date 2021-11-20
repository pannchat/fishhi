import { useRouter } from "next/dist/client/router";
import React from "react";
import Species from "../../components/info/species";

const InfoPageDetail = () => {
  const router = useRouter();
  const { param } = router.query;
  const species = param ? param[0] : null;

  if (!species) return null;
  return <Species species={species} />;
};

export default InfoPageDetail;
