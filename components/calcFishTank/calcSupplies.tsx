/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { IGetSuppliesProductResponse, useSuppliesProduct } from '../../shared/hooks/useSuppliesProduct';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';

const IMAGE_BASE_URL = 'https://fishhi.kr/thumbnails/';
const CalcSupplies = (props?: { initData?: IGetSuppliesProductResponse }) => {
  const { data } = useSuppliesProduct(props?.initData);
  const [toggle, setToggle] = useState(true);
  // commit
  if (!data) return <div></div>;
  return (
    <div className="calc-supplies">
      {data.map((value, index) => {
        const { img, productName, recommendedUsage1, recommendedUsage2 } = value;
        return (
          <li className="search-list" key={`searchList${index}`}>
            <div className="supplies-items">
              <img
                src={`https://fishhi.kr/thumbnails/${img}`}
                alt={`${productName} 상품`}
                style={{
                  objectFit: 'contain',
                  objectPosition: 'center center',
                  width: '120px',
                  height: '120px',
                  marginRight: '10px',
                  aspectRatio: '1/1',
                }}
              />
              <div className="test2">
                <p className="supply-product-name">{productName}</p>
                <p>
                  권장 사용량 : {recommendedUsage1}L 당 {recommendedUsage2}cc
                </p>
                <p>
                  내 어항 사용량 :{' '}
                  <b style={{ color: '#8aa1a1' }}>
                    {/* {capacity
                    ? `${(
                        (capacity / recommendedUsage1) *
                        el.recommendedUsage2
                      ).toFixed(2)}cc`
                    : "?"} */}
                    5.2cc
                  </b>{' '}
                  권장
                </p>
              </div>
              <div className="test3">
                {toggle ? (
                  <BsBookmark size="25" color="#8aa1a1" style={{ cursor: 'pointer' }} onClick={() => setToggle(true)} />
                ) : (
                  <BsBookmarkFill
                    size="25"
                    color="#8aa1a1"
                    style={{ cursor: 'pointer' }}
                    onClick={() => setToggle(false)}
                  />
                )}
              </div>
            </div>
          </li>
        );
      })}

      <style jsx>{`
        .search-list {
          display: flex;
          cursor: pointer;
        }
        .supplies-items {
          display: flex;
          width: 100%;
          border-radius: 5px;
          margin: 15px 5px;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
        }
        .test2 {
          display: flex;
          flex-direction: column;
          padding: 10px 0;
          flex: 1 0;
        }
        .supply-product-name {
          font-weight: bold;
          font-size: 1.5em;
          margin-bottom: auto;
        }
        .test3 {
          display: flex;
          justify-content: center;
          flex-basis: 50px;
        }
      `}</style>
    </div>
  );
};

export default CalcSupplies;
function InferGetStaticPropsType<T>() {
  throw new Error('Function not implemented.');
}
