import React from "react";

interface ICategoryItem {
  label: string;
  img?: string;
  imgWidth?: string | number;
  imgHeight?: string | number;
  onClick?: (value: any) => void;
  width?: string | number;
  height?: string | number;
}

const CategoryList = () => {};

const CategoryItem = (props: ICategoryItem) => {
  const { label, img, imgWidth, imgHeight, onClick, width, height } = props;
  return (
    <div
      className="category-item__wrapper"
      style={{
        width: width,
        height: height,
      }}
    >
      {img && <img src={img} width={imgWidth} height={imgHeight} />}
      <p className="category-item-label">{label}</p>
      <style jsx>{`
        .category-item__wrapper {
          display: flex;
          align-items: center;
          border-radius: 10px;
          background-color: #606e78;
        }

        .category-item-label {
          font-size: 16px;
          fong-weight: 500;
          color: white;
        }
      `}</style>
    </div>
  );
};
