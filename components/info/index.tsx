import React from 'react';
import CategoryList from '../../shared/commonComponent/category';

const INFO_CATEGORY_DUMMY = [
  {
    id: 'fish',
    label: '어종',
  },
  {
    id: 'aquaplant',
    label: '수초',
  },
  {
    id: 'medicine',
    label: '약품',
  },
];
const Info = () => {
  return (
    <div className="info__wrapper">
      <h4 className="info-subtitle">
        찾고 싶은 카테고리를
        <br />
        선택해 주세요.
      </h4>

      <CategoryList data={INFO_CATEGORY_DUMMY} />
      <style jsx>{`
        .info-subtitle {
          font-weight: 400;
          font-size: 18px;
          padding-top: 10px;
          padding-left: 10px;
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  );
};

export default Info;
