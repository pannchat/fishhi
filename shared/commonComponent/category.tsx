import React from "react";
import ListView from "./listView";

interface ICategoryItemProps {
  id: string;
  label: string;
  img?: string;
  imgWidth?: string | number;
  imgHeight?: string | number;
  onClick?: (value: any) => void;
  width?: string | number;
  height?: string | number;
}

interface ICategoryProps
  extends Pick<ICategoryItemProps, "id" | "label" | "img" | "onClick"> {}

const CategoryList = (props: ICategoryProps[]) => {
  return (
    <ListView
      list={props}
      gap={1}
      column={2}
      columnSize="40%"
      ListItem={(props: ICategoryProps) => <CategoryItem {...props} />}
    />
  );
};

export default CategoryList;

const CategoryItem = (props: ICategoryItemProps) => {
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
