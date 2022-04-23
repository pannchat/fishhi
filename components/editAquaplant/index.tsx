import { useRouter } from "next/dist/client/router";
import React from "react";
import AquaPlant from "../addAquaplant";

export interface IEditAquaplantProps {
  id: number;
}

const EditAquaplant = (props: IEditAquaplantProps) => {
  const { id } = props;
  return <AquaPlant id={1} />;
};

export default EditAquaplant;
