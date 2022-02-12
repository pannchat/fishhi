import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { darken } from "polished";
import Previews from "../../shared/hooks/usePreviews";
import styles from "./index.module.scss";
import { Button, useToast, Slider, SliderTrack, SliderFilledTrack, SliderThumb, SliderMark } from "@chakra-ui/react";
import axios from "axios";

const palette = {
  gray: "#ced4da",
  pink: "#ffc9c9",
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
  standard_length: number | null;
  aquarium_minimum_size: number | null;
  min_temperature: number | null;
  max_temperature: number | null;
  min_pH: number | null;
  max_pH: number | null;
  description: string;
  source: string;
  source_url: string;
  scientific_name: string;
  [prop: string]: any;
}

interface Ifile {
  name: React.Key | null | undefined;
  setFiles?: (value?: any) => void;
}

function addFish() {
  const [files, setFiles] = useState<Ifile[]>([]);
  const [submitState, setSubmitState] = useState<boolean>(false);
  const [isMain, setIsMain] = useState<Ifile>({
    name: "",
  });
  const toast = useToast();
  const [fish, setFish] = useState<IFish>({
    species: "",
    standard_length: null,
    aquarium_minimum_size: null,
    min_temperature: null,
    max_temperature: null,
    min_pH: null,
    max_pH: null,
    description: "",
    source: "",
    source_url: "",
    scientific_name: "",
  });
  const dummy: IFish = {
    species: "금붕어",
    standard_length: 7,
    aquarium_minimum_size: 10,
    min_temperature: 20,
    max_temperature: 30,
    min_pH: 5,
    max_pH: 7,
    description: "먹성이 좋음",
    source: "물고기닷컴",
    source_url: "http://naver.com",
    scientific_name: "gold fish",
  };

  useEffect(() => {

  });

  let mainImgUrl = "";
  const addFish = async (fishData: IFish) => {
    setSubmitState(true);

    const images = await uploadImage();

    if (images.length === 0) {
      toast({
        description: "이미지가 없습니다.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const dataForm: any = {};
    Object.keys(fishData).map(fish => {
      dataForm[fish] = fishData[fish];
    });

    const imgarr = images.map((image, idx) => {
      return {
        image_url: image.url,
        is_main: isMain.name === image.filename ? true : false,
      };
    });
    dataForm["images"] = imgarr;
    console.log(dataForm);
    try {
      const fish = await axios.post("http://54.180.156.194:8000/fish/", JSON.stringify(dataForm), {
        headers: { "Content-Type": "application/json" },
      });
      if (fish.status === 201) {
        toast({
          description: "Fish Created",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (e) {
      toast({
        description: `${e}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });

    }


    setSubmitState(false);
  };

  const uploadImage = async () => {
    try {
      if (files.length === 0) {
        setSubmitState(false);
        return [];
      } else {
        const images = await Promise.all(
          files.map(async (file: any) => {

            let fishData = new FormData();
            fishData.append("filename", file.name);
            fishData.append("file", file);
            fishData.append("key", "fishhi/fish");
            let response = await axios.post("http://54.180.156.194:8000/upload_image", fishData, {
              headers: { "Content-Type": `multipart/form-data` },
            });

            if (file.name === isMain.name) mainImgUrl = response.data.url;
            return {
              filename: file.name,
              url: response.data.url
            };
          }),
        );
        return images;
      }
    } catch (e) {
      throw new Error("정상적인 요청이아닙니다.");
    }
  };
  return (
    <>
      <Alert variant={palette.gray}>fish_info</Alert>
      <div className={styles["addDict-body"]}>
        {Object.keys(fish).map((item: any, idx: number) => {
          return (
            <div className={styles["addDict-body__input-box"]} key={`${item.id}-${idx}`}>
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

        <Previews files={files} setFiles={setFiles} isMain={isMain} setIsMain={setIsMain} />
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
};

export default addFish;