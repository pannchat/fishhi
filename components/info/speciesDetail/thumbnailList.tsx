import React, { useState } from "react";
import CustomImage from "../../../shared/commonComponent/image";
import styles from "./index.module.scss";

interface IThumbnailListProps {
  images: string[];
}
const ThumbnailList = (props: IThumbnailListProps) => {
  const { images } = props;
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  return (
    <div className={styles["thumbnail__wrapper"]}>
      <div className={styles["thumbnail__selected-image"]}>
        <CustomImage width={"450px"} height={"300px"} src={images[selectedIndex]} ratio={16 / 9} />
      </div>
      <div className={styles["thumbnail__list"]}>
        {images.map((image, index) => {
          return (
            <CustomImage
              key={`thumbnail_${index}`}
              src={image}
              width={"80px"}
              height={"80px"}
              ratio={1 / 1}
              style={{
                border: selectedIndex === index ? `3px solid #F7856D` : `none`,
                borderRadius: 10,
                overflow: "hidden",
                cursor: "pointer",
              }}
              onClick={() => {
                setSelectedIndex(index);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ThumbnailList;
