import { useRouter } from 'next/dist/client/router';
import React from 'react';
import Species from '../../components/info/species';
import SpeciesDetail from '../../components/info/speciesDetail';

const InfoPageDetail = () => {
  const router = useRouter();
  const { param } = router.query;
  const species = param ? param[0] : null;
  const id = param ? param[1] : null;
  if (!species) return null;
  if (!id) return <Species species={species} />;
  return <SpeciesDetail id={id} />;
};

export default InfoPageDetail;
