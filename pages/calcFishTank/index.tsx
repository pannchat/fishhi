import React from 'react';
import { getSuppliesProduct } from '../../api';
import CalcFishTank from '../../components/calcFishTank';
import { IGetSuppliesProductResponse } from '../../shared/hooks/useSuppliesProduct';

export async function getStaticProps() {
  const suppliesProduct = await getSuppliesProduct();

  return {
    props: {
      suppliesProduct,
    },
  };
}

const CalcFishTankPage = (props: { suppliesProduct: IGetSuppliesProductResponse }) => {
  const { suppliesProduct } = props;

  return <CalcFishTank initData={suppliesProduct} />;
};

export default CalcFishTankPage;
