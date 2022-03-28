/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { useCallback, useMemo, useState } from "react";
import ListView from "../../../shared/commonComponent/listView";
import useMouseHover from "../../../shared/hooks/useMouseHover";
import LinkCustom from "../../../shared/commonComponent/link";
import UrlPath from "../../../shared/urlPath";
import { FishSpeciesName } from "../../../shared/enum";
import { getEumEntries } from "../../../shared/funtion";
import useContents from "../../../shared/hooks/useContents";
import { IAquaplant, IContentsItem, ISpecies } from "../../../shared/interface";
import { AspectRatio } from "@chakra-ui/react";
import ImagePath from "../../../shared/imagePath";
import Spacing from "../../../shared/commonComponent/spacing";
import InfiniteScrollWrapper from "../../infiniteScrollWrapper";

const Species = <T extends unknown>(props: { species: string; initData?: T }) => {
  const { species, initData } = props;
  const [offset, setOffset] = useState<number>(8);
  const { data } = useContents(species, initData, { offset: offset });
  const { refinedObj } = getEumEntries(FishSpeciesName);
  const speciesName = refinedObj[species];
  console.log("### data => ", data);

  const fetchMoreHalder = useCallback(() => {
    // setOffset(offset + 8);
  }, []);

  if (data && data.length < 1) return null;
  return (
    <section>
      <Spacing height={20} />
      <h1 className="species-list-title">{speciesName}</h1>
      <Spacing height={20} />

      <ListView
        list={data}
        column={2}
        columnSize={"50%"}
        gap={20}
        ListItem={(props: ISpecies) => <SpeciesItem data={props} species={species} />}
      />

      <Spacing height={50} />
      <style jsx>{`
        .species-list-title {
          padding-left: 5px;
        }
      `}</style>
    </section>
  );
};

export default Species;

export const SpeciesItem = (props: { data: IContentsItem; species: string }) => {
  const { data, species: type } = props;
  const { thumbnail, species, name, product_name, description, id } = data;
  const { isHover, onMouseEnterHandler, onMouseLeaveHandler } = useMouseHover();

  const title = useMemo(() => {
    if (species) return species;
    return null;
  }, [species]);

  const onErrorHandler = useCallback((e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.style.position = "absolute";
    e.currentTarget.style.transition = "none";
    e.currentTarget.style.transform = "translate(-50%, -50%)";
    e.currentTarget.style.top = "50%";
    e.currentTarget.style.left = "50%";
    e.currentTarget.style.width = "100px";
    e.currentTarget.style.height = "50px";
    e.currentTarget.src = ImagePath.placeholder;
  }, []);
  return (
    <LinkCustom href={UrlPath.speciesDetail(type as string, String(id))}>
      <div className="info-detail-item" onMouseEnter={onMouseEnterHandler} onMouseLeave={onMouseLeaveHandler}>
        <AspectRatio ratio={1 / 1} border="1px solid #e5e5e5" borderRadius={10} overflow={"hidden"}>
          {thumbnail ? (
            <img
              key={thumbnail}
              className="item__image"
              src={thumbnail}
              width={"100%"}
              height={"100%"}
              placeholder="이미지"
              onError={onErrorHandler}
              style={{
                objectFit: "fill",
              }}
            />
          ) : (
            <img
              key={ImagePath.placeholder}
              className="item__image --placeholder"
              src={ImagePath.placeholder}
              placeholder="이미지"
              onError={onErrorHandler}
            />
          )}
        </AspectRatio>

        <div className="info-detail-item-description">
          <p className="info-detail-item__title">{title}</p>
        </div>
      </div>

      <style jsx>{`
        .info-detail-item {
          width: 100%;
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

        .none-image {
          font-size: 12px;
          font-weight: 700;
        }

        .item__image {
          transform: scale(${isHover ? 1.2 : 1});
          transition: transform 0.3s ease;
          object-fit: contain;
        }

        .item__image.--placeholder {
          position: absolute;
          transition: none;
          transform: translate(-50%, -50%);
          top: 50%;
          left: 50%;
          width: 100px;
          height: 50px;
        }

        .info-detail-item__title {
          font-size: 14px;
          font-weight: 700;
          text-align: center;
          margin-top: 5px;
          text-decoration: ${isHover ? "underline" : "none"};

          height: 40px;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 1;
        }
      `}</style>
    </LinkCustom>
  );
};
