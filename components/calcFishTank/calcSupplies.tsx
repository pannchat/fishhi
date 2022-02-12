/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { IGetSuppliesProductResponse, useSuppliesProduct } from '../../shared/hooks/useSuppliesProduct';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import styles from './index.module.scss';

const IMAGE_BASE_URL = 'https://fishhi.kr/thumbnails/';
const CalcSupplies = (props?: { initData?: IGetSuppliesProductResponse; }) => {
  const { data } = useSuppliesProduct(props?.initData);
  const [toggle, setToggle] = useState(true);
  // commit
  if (!data) return <div></div>;
  return (
    <div className={styles["calc-supplies"]}>
      {data.map((value, index) => {
        const { img, productName, recommendedUsage1, recommendedUsage2 } = value;
        return (
          <li className={styles["search-list"]} key={`searchList${index}`}>
            <div className={styles["supplies-items"]}>
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
              <div className={styles["test2"]}>
                <p className={styles["supply-product-name"]}>{productName}</p>
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
              <div className={styles["test3"]}>
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
        
      `}</style>
    </div>
  );
};

export default CalcSupplies;
function InferGetStaticPropsType<T>() {
  throw new Error('Function not implemented.');
}
