/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useMemo } from "react";
import ListView from "../../../shared/commonComponent/listView";
import Spacing from "../../../shared/commonComponent/spacing";
import SpecBox from "../specBox";
const SPECIES_DETAIL_GAP = 20;
const SpeciesDetail = <T extends unknown>(props: { id: string; type: string; initData?: T }) => {
  return <div></div>;
};

export default SpeciesDetail;
