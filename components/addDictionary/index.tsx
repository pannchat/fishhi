import React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import Previews from './Previews'


const palette = {
  gray: '#ced4da',
  pink: '#ffc9c9',
};

const Alert = styled.div<{variant : string}>`
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
        <Previews />
    </>
  );
}

export default addDictionary;
