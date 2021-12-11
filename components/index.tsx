import React from 'react';
import Title from '../shared/commonComponent/title';
import ImagePath from '../shared/imagePath';
import UrlPath from '../shared/urlPath';

const Main = () => {
  return (
    <div className="main__wrapper">
      <Title title="인기 어종" img={ImagePath.fishIcon} width={35} height={35} href={UrlPath.FishInfo} />
    </div>
  );
};

export default Main;
