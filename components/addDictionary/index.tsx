import React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import Previews from './Previews';
import styles from './index.module.scss';

const palette = {
  gray: '#ced4da',
  pink: '#ffc9c9',
};

const Alert = styled.div<{ variant: string }>`
  width: auto;
  box-sizing: border-box;
  margin: 10px;
  padding: 10px;
  background-color: ${props => props.variant};
  border: 1px solid ${props => darken(0.1, props.variant)};
  border-radius: 4px;
`;

function addDictionary() {
  return (
    <>
      <Alert variant={palette.gray}>fish_info</Alert>
      <div className={styles['addDict-body']}>
        <div className={styles['addDict-body__input-box']}>
          <div>species</div>
          <input placeholder="금붕어"></input>
        </div>
        <div className={styles['addDict-body__input-box']}>
          <div>standard_length</div>
          <input placeholder="5"></input>
        </div>
        <div className={styles['addDict-body__input-box']}>
          <div>aquarium_minimum_size</div>
          <input placeholder="30"></input>
        </div>
        <div className={styles['addDict-body__input-box']}>
          <div>min_temperature</div>
          <input placeholder="15"></input>
        </div>
        <div className={styles['addDict-body__input-box']}>
          <div>max_temperature</div>
          <input placeholder="20"></input>
        </div>
        <div className={styles['addDict-body__input-box']}>
          <div>min_pH</div>
          <input placeholder="5"></input>
        </div>
        <div className={styles['addDict-body__input-box']}>
          <div>max_pH</div>
          <input placeholder="6"></input>
        </div>
        <div className={styles['addDict-body__input-box']}>
          <div>description</div>
          <input placeholder="뒤돌면 까먹음"></input>
        </div>
        <Previews />
      </div>
    </>
  );
}

export default addDictionary;


