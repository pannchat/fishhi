import React, { useState } from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import Previews from './Previews';
import styles from './index.module.scss';
import { Button, useToast, Slider, SliderTrack, SliderFilledTrack, SliderThumb, SliderMark } from '@chakra-ui/react';

import axios from 'axios';
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
    [prop: string]: any;
}
interface Ifile {
  name: React.Key | null | undefined;
  preview: string | undefined;
  setFiles?: (value?: any) => void;
}

function addDictionary() {
    const [files, setFiles] = useState([]);
    const [submitState, setSubmitState] = useState<boolean>(false);
    const toast = useToast();
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

    const addFish = async (fishData: IFish) => {
        setSubmitState(true);

        const images = await uploadImage();
        console.log(images)
        if(images.length===0){
            toast({
                description: '이미지가 없습니다.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return
        }
        const formData = new FormData();
        Object.keys(fishData).map(fish => {
            formData.append(fish, fishData[fish]);
        });
        formData.append(
            'images',
            JSON.stringify(
                images.map((image, idx) => {
                    return {
                        image_url: image,
                        is_main: idx === 0 ? true : false
                    };
                }),
            ),
        );

        const fish = await axios.post('http://54.180.156.194:8000/fish/', formData, {
            headers: { 'Content-Type': 'application/json' },
        });
        console.log(fish);
        if (fish.status === 201) {
            toast({
                description: 'Fish Created',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        }
        setSubmitState(false);
        window.location.reload();
    };

    const uploadImage = async () => {
        try {
            if (files.length === 0) {
                setSubmitState(false);
                return [];
            } else {
                const images = await Promise.all(
                    files.map(async (file: any) => {
                        console.log(file)
                        let fishData = new FormData();
                        fishData.append('filename', file.name);
                        fishData.append('file', file);
                        fishData.append('key', 'fish');
                        let response = await axios.post('http://54.180.156.194:8000/upload_image', fishData, {
                            headers: { 'Content-Type': `multipart/form-data` },
                        });
                        console.log(response.data.url);
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
            <div className={styles['addDict-body']}>
                {Object.keys(fish).map((item: any, idx: number) => {
                    return (
                        <div className={styles['addDict-body__input-box']} key={`${item.id}-${idx}`}>
                            <div>{item}</div>
                            <input
                                id={item}
                                placeholder={dummy[item]}
                                onChange={e => {
                                    setFish({
                                        ...fish,
                                        [e.target.id]: e.target.value,
                                    });
                                }}
                                disabled={submitState ? true : false}
                            ></input>
                        </div>
                    );
                })}

                <Previews files={files} setFiles={setFiles} />
                {!submitState ? (
                    <Button colorScheme="teal" size="lg" onClick={() => addFish(fish)}>
                        Submit
                    </Button>
                ) : (
                    <Button isLoading loadingText="Submitting" size="lg" colorScheme="teal" variant="outline">
                        Submit
                    </Button>
                )}
            </div>
        </>
    );
}

export default addDictionary;
