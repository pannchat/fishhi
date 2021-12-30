/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useSuppliesProduct } from '../../shared/hooks/useSuppliesProduct';
const IMAGE_BASE_URL = 'https://fishhi.kr/thumbnails/';
const CalcSupplies = () => {
  const { data } = useSuppliesProduct();

  if (!data) return <div></div>;
  return (
    <div className="calc-supplies">
      {data.map((value: any, index: number) => {
        const { img, productName, recommendedUsage1, recommendedUsage2 } = value;
        return (
          <li className="search-list" key={`searchList${index}`}>
            <div className='supplies-items'>
              <img
                src={`https://fishhi.kr/thumbnails/${img}`}
                alt={`${productName} 상품`}
                style={{
                  objectFit: 'contain',
                  width: '100px',
                  height: '100px',
                  border: '1px solid #aaa'
                }}
              />
              <div className="test2">
                <p className="supply-product-name">{productName}</p>
                <p>
                  권장 사용량 : {recommendedUsage1}L 당 {recommendedUsage2}cc
                </p>
                <p>
                  내 어항 사용량 :{' '}
                  <b>
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
            </div>
          </li>
        );
      })}

      <style jsx>{`
        .search-list {
          display: flex;
          border-radius: 5px;
          margin: 5px;
        }
        .supplies-items{
          display:flex;
          width:100%;
        }

      `}</style>
    </div>
  );
};

export default CalcSupplies;
