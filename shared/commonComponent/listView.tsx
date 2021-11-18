import React, { ReactNode } from "react";

interface IListViewProps<T> {
  column: number;
  columnSize: string;
  gap: number;
  list: T[];
  ListItem: (props: T) => JSX.Element;
}

const ListView = <T extends unknown>(props: IListViewProps<T>) => {
  const { column, columnSize, gap, list, ListItem } = props;
  return (
    <div className="list-view__wrapper">
      {list.map((value, index) => (
        <ListItem key={`listViewItem${index}`} {...value} />
      ))}
      <style jsx>{`
        .list-view__wrapper {
          width: 90%;
          margin-left: auto;
          margin-right: auto;
          display: grid;
          column-gap: ${gap}px;
          row-gap: ${gap}px;
          grid-template-columns: 1fr 1fr;
        }
      `}</style>
    </div>
  );
};

export default ListView;
