/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import ListView from '../../../shared/commonComponent/listView';
import useMouseHover from '../../../shared/hooks/useMouseHover';
import LinkCustom from '../../../shared/commonComponent/link';
import UrlPath from '../../../shared/urlPath';
import { FishSpeciesName } from '../../../shared/enum';
import { getEumEntries } from '../../../shared/funtion';
import useContents from '../../../shared/hooks/useContents';
import { IAquaplant, ISpecies } from '../../../shared/interface';

const Species = (props: { species: string; initData?: any }) => {
  const { species, initData } = props;
  const { data } = useContents(species, initData);
  const { refinedObj } = getEumEntries(FishSpeciesName);
  const speciesName = refinedObj[species];
  if (data && data.length < 1) return null;

  return (
    <div>
      <h1 className="species-list-title">{speciesName}</h1>
      <ListView
        list={data}
        column={2}
        columnSize={'50%'}
        gap={10}
        ListItem={(props: ISpecies) => <SpeciesItem data={props} species={species} />}
      />

      <style jsx>{`
        .species-list-title {
          padding-left: 5px;
        }
      `}</style>
    </div>
  );
};

export default Species;

export const SpeciesItem = (props: { data: ISpecies; species: string }) => {
  const { data, species } = props;
  const { thumbnail, name, id } = data;
  const { isHover, onMouseEnterHandler, onMouseLeaveHandler } = useMouseHover();
  if (!thumbnail || thumbnail.length < 1) return <></>;
  return (
    <LinkCustom href={UrlPath.speciesDetail(species as string, String(id))}>
      <div className="info-detail-item" onMouseEnter={onMouseEnterHandler} onMouseLeave={onMouseLeaveHandler}>
        <div className="info-detail-item-thumbnail">
          <img className="item__image" src={thumbnail[0].image_url} width={'100%'} height={'100%'} />
        </div>
        <div className="info-detail-item-description">
          <p className="info-detail-item__title">{name}</p>
        </div>
      </div>

      <style jsx>{`
        .info-detail-item {
          width: 90%;
          margin-left: auto;
          margin-right: auto;
          cursor: pointer;
        }

        .info-detail-item-thumbnail {
          position: relative;
          padding-bottom: 66%;
          overflow: hidden;
          border: 1px solid #d2d2d2;
          border-radius: 10px;
        }

        .item__image {
          position: absolute;
          top: 0;
          left: 0;

          transform: scale(${isHover ? 1.2 : 1});
          transition: transform 0.3s ease;
        }

        .info-detail-item__title {
          font-size: 14px;
          font-weight: 700;
          text-align: center;
          margin-top: 5px;
          text-decoration: ${isHover ? 'underline' : 'none'};
        }
      `}</style>
    </LinkCustom>
  );
};
