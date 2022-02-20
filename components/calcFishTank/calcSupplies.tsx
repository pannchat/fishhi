/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { IGetSuppliesProductResponse, useSuppliesProduct } from '../../shared/hooks/useSuppliesProduct';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import styles from './index.module.scss';
import { ISupplies } from './index';

const CalcSupplies = (props: { suppliesList: ISupplies[], waterCapacity: number; }) => {
  const [toggle, setToggle] = useState(true);
  return (
    <div className={styles["calc-supplies"]}>
      {props.suppliesList.map((value, index) => {
        const { id, product_name, standard_amount, input_amount, input_unit, thumbnail, my_tank_input } = value;
        return (
          <li className={styles["search-list"]} key={`searchList${index}`}>
            <div className={styles["supplies-items"]}>
              <img
                src={`${thumbnail}`}
                alt={`${product_name} 상품`}
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
                <p className={styles["supply-product-name"]}>{product_name}</p>
                <p>
                  권장 사용량 : {standard_amount}L 당 {input_amount}cc
                </p>
                <p>
                  내 어항 사용량 :{' '}
                  <b style={{ color: '#8aa1a1' }}>
                    {`${props.waterCapacity ? (props.waterCapacity * (input_amount / standard_amount)).toFixed(2) + input_unit : '?'}`}
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
