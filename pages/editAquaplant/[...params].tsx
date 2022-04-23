import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";

import Aquaplant from '../../components/addAquaplant'

// merge
const EditPageDetail = () => {
  const router = useRouter();
  const { params } = router.query;
  
  if (!params || params.length < 1) return <></>;
  const id = parseInt(params[0]);
  return <Aquaplant id={id} />;
};

export default EditPageDetail;
