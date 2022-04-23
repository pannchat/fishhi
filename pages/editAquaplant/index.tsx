import { useRouter } from "next/dist/client/router";
import React from "react";
import EditAquaplant from "../../components/editAquaplant";

const EditAquaplantPage = () => {
  const router = useRouter();
  const { params } = router.query;
  console.log("params => ", params);
  return <EditAquaplant id={1} />;
};

export default EditAquaplantPage;
