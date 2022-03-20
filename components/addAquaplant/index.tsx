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

interface IAquaplant {
  species: string;
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

function addAquaplant() {
  const [files, setFiles] = useState<Ifile[]>([]);
  const [submitState, setSubmitState] = useState<boolean>(false);
  const [isMain, setIsMain] = useState<Ifile>({
    name: "",
  });
  const toast = useToast();
  const [aquaplant, setAquaplant] = useState<IAquaplant>({
    species: "",
    min_temperature: null,
    max_temperature: null,
    min_pH: null,
    max_pH: null,
    description: "",
    source: "",
    source_url: "",
    scientific_name: "",
  });
  const dummy: IAquaplant = {
    species: "아누비아스 바테리 나나",
    min_temperature: 22,
    max_temperature: 28,
    min_pH: 6,
    max_pH: 7,
    description: "아누비아스 바테리는 나이지리아 남동부, 카메룬 및 비오코에서 서식합니다. 잎은 12인치(300mm)까지 자랄 수 있습니다. 아누비아스 바테리는 부분 혹은 완전 잠긴채로 자라고 강한 빛에서 잎이 더 빠르게 자라며 촘촘하게 유지되지만, 낮은 광량에서도 견딜 수 있습니다.",
    source: "",
    source_url: "",
    scientific_name: "Anubias barteri var. nana",
  };

  useEffect(() => {

  });

  let mainImgUrl = "";
  const addAquaplant = async (aquaplantData: IAquaplant) => {
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
    Object.keys(aquaplantData).map(aquaplant => {
      dataForm[aquaplant] = aquaplantData[aquaplant];
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
      const aquaplant = await axios.post("http://54.180.156.194:8000/aquaplant/", JSON.stringify(dataForm), {
        headers: { "Content-Type": "application/json" },
      });
      if (aquaplant.status === 201) {
        toast({
          description: "Aquaplant Created",
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

            let aquaplantData = new FormData();
            aquaplantData.append("filename", file.name);
            aquaplantData.append("file", file);
            aquaplantData.append("key", "fishhi/aquaplant");
            let response = await axios.post("http://54.180.156.194:8000/upload_image", aquaplantData, {
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
      <Alert variant={palette.gray}>Aquaplant_info</Alert>
      <div className={styles["addDict-body"]}>
        {Object.keys(aquaplant).map((item: any, idx: number) => {
          return (
            <div className={styles["addDict-body__input-box"]} key={`${item.id}-${idx}`}>
              <div>{item}</div>
              <input
                id={item}
                placeholder={dummy[item]}
                onChange={e => {
                  setAquaplant({
                    ...aquaplant,
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
          <Button colorScheme="teal" size="lg" onClick={() => addAquaplant(aquaplant)}>
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

export default addAquaplant;
