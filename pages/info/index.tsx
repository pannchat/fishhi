import { useRouter } from 'next/dist/client/router';
import React from 'react';
import Info from '../../components/info';
// merge
const InfoPage = () => {
  return (
    <div className="info-page">
      <Info />
    </div>
  );
};

export default InfoPage;
