import { useRouter } from "next/dist/client/router";
import React from "react";

import Fish from '../../components/addFish'

// merge
const EditPageDetail = () => {
  const router = useRouter();
  const { params } = router.query;
  
  if (!params || params.length < 1) return <></>;
  const id = parseInt(params[0]);
  return <Fish id={id} />;
};

export default EditPageDetail;
