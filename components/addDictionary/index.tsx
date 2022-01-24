import React, { useState } from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import Previews from './Previews';
import styles from './index.module.scss';
import axios from 'axios';
const palette = {
  gray: '#ced4da',
  pink: '#ffc9c9',
};

const Alert = styled.div<{ variant: string; }>`
  width: auto;
  box-sizing: border-box;
  margin: 10px;
  padding: 10px;
  background-color: ${props => props.variant};
  border: 1px solid ${props => darken(0.1, props.variant)};
  border-radius: 4px;
`;

interface IFish {
  species: string;
  standard_length: number;
  aquarium_minimum_size: number;
  min_temperature: number;
  max_temperature: number;
  min_pH: number;
  max_pH: number;
  description: string;
  source: string;
  source_url: string;
  scientific_name: string;
}
function addDictionary() {
  const [files, setFiles]: any = useState([]);
  const [fish, setFish] = useState<IFish>({
    species: '',
    standard_length: 0,
    aquarium_minimum_size: 0,
    min_temperature: 0,
    max_temperature: 0,
    min_pH: 0,
    max_pH: 0,
    description: '',
    source: '',
    source_url: '',
    scientific_name: '',
  });
  const dummy: IFish = {
    species: '금붕어',
    standard_length: 7,
    aquarium_minimum_size: 10,
    min_temperature: 20,
    max_temperature: 30,
    min_pH: 5,
    max_pH: 7,
    description: '먹성이 좋음',
    source: '물고기닷컴',
    source_url: 'http://naver.com',
    scientific_name: 'gold fish',
  };
  const addFish = async () => {
    const images = await uploadImage();
    const formData = new FormData();
    formData.append('species', 'ㅁㅁ');
    formData.append('standard_length', 5 as any);
    formData.append('aquarium_minimum_size', 30 as any);
    formData.append('min_temperature', 15 as any);
    formData.append('max_temperature', 15 as any);
    formData.append('min_pH', 15 as any);
    formData.append('max_pH', 15 as any);
    formData.append('description', '뒤돌면 까먹음');
    formData.append('source', '피쉬넷');
    formData.append('source_url', 'test.com');
    formData.append('scientific_name', '대머리금붕어');
    formData.append(
      'images',
      JSON.stringify(
        images.map((image, idx) => {
          return {
            image_url: image,
            is_main: idx === 0 ? true : false,
          };
        }),
      ),
    );

    const fish = await axios.post('http://54.180.156.194:8000/fish/', formData, {
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(fish);
  };
  const uploadImage = async () => {
    try {
      if (files.length === 0) {
        alert('이미지를 업로드해주세요.');
        return [];
      } else {
        const images = await Promise.all(
          files.map(async (file: any) => {
            let fishData = new FormData();
            fishData.append('filename', file.name);
            fishData.append('file', file);
            fishData.append('key', 'fish');
            let response = await axios.post('http://54.180.156.194:8000/upload_image', fishData, {
              headers: { 'Content-Type': `multipart/form-data` },
            });
            return response.data.url;
          }),
        );
        return images;
      }
    } catch (e) {
      throw new Error('정상적인 요청이아닙니다.');
    }
  };
  return (
    <>
      <Alert variant={palette.gray}>fish_info</Alert>
      <img src="https://fishhi.s3.ap-northeast-2.amazonaws.com/fis…3165623_64FC5590-17B6-49CF-8A6B-B3DE11AD612A.jpeg" />
      <div className={styles['addDict-body']}>
        {Object.keys(fish).map((item: any) => {
          return (
            <div className={styles['addDict-body__input-box']}>
              <div>{item}</div>
              <input id={item} placeholder={dummy[item]} onChange={(e) => {
                setFish({
                  ...fish,
                  [e.target.id]: e.target.value
                });
              }}></input>
            </div>
          );
        })}


        <Previews files={files} setFiles={setFiles} />
        <button onClick={() => addFish()}>업로드</button>
      </div>
    </>
  );
}

export default addDictionary;
