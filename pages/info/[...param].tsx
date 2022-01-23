import { GetStaticPaths } from 'next';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { getAquaplant, getFishListApi } from '../../api';
import Species from '../../components/info/species';
import SpeciesDetail from '../../components/info/speciesDetail';
import { IAquaplant } from '../../shared/interface';
export async function getStaticPaths() {
  return {
    paths: [{ params: { param: ['fish'] } }, { params: { param: ['aquaplant'] } }, { params: { param: ['medicine'] } }],
    fallback: false,
  };
}
export async function getStaticProps(value: any) {
  const category = value.params.param[0] as string;

  if (category === 'fish') {
    const data = await getFishListApi();
    return {
      props: {
        data,
      },
    };
  }

  if (category === 'aquaplant') {
    const data = await getAquaplant();
    return {
      props: {
        data: data,
      },
    };
  }

  return {
    props: {
      data: null,
    },
  };
}
// merge
const InfoPageDetail = <T extends unknown>(props: { data: T }) => {
  const { data } = props;
  const router = useRouter();
  const { param } = router.query;
  const species = param ? param[0] : null;
  const id = param ? param[1] : null;
  if (!species) return null;
  if (!id) return <Species species={species} initData={data} />;
  return <SpeciesDetail id={id} type={species} />;
};

export default InfoPageDetail;
