import { useRouter } from "next/dist/client/router";
import React from "react";

import Supplies from '../../components/addSupplies'

// merge
const EditPageDetail = () => {
  const router = useRouter();
  const { params } = router.query;
  
  if (!params || params.length < 1) return <></>;
  const id = parseInt(params[0]);
  return <Supplies id={id} />;
};

export default EditPageDetail;
