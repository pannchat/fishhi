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

type PickedICategoryItem = Pick<
  ICategoryItemProps,
  "id" | "label" | "img" | "onClick"
>;

interface ICategoryProps {
  data: PickedICategoryItem[];
}

const CategoryList = (props: ICategoryProps) => {
  const usingList: PickedICategoryItem[] = props.data.map((value) => {
    return {
      ...value,
      width: "100%",
      height: 50,
    };
  });
  return (
    <ListView
      list={usingList}
      gap={10}
      column={1}
      columnSize="45%"
      ListItem={(props: PickedICategoryItem) => <CategoryItem {...props} />}
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
          justify-content: center;
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
