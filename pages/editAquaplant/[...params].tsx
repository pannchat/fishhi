import { useRouter } from "next/dist/client/router";
import React from "react";
import {
  getAquaplantApi,
  getAquaplantRetriveApi,
  getFishListApi,
  getFishRetriveApi,
  getSupplies,
  getSupplyRetriveApi,
} from "../../api";
import Contents from "../../components/contents";
import EditAquaplant from "../../components/editAquaplant";
import ErrorView from "../../components/errorView";
import Species from "../../components/info/species";
import SpeciesDetail from "../../components/info/speciesDetail";

// merge
const InfoPageDetail = () => {
  const router = useRouter();
  const { params } = router.query;

  if (!params || params.length < 1) return <></>;
  const id = parseInt(params[0]);
  return <EditAquaplant id={id} />;
};

export default InfoPageDetail;
