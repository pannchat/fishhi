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

interface ISupplies {
  product_name: string;
  manufacturer: string;
  manual_text: string;
  base_medicine: string;
  standard_amount: number | null;
  input_amount: number | null;
  input_unit: string;
  disease: string;
  spec: string;
  pump_amount: string;
  source: string;
  source_url: string;
  [prop: string]: any;
}

interface Ifile {
  name: React.Key | null | undefined;
  setFiles?: (value?: any) => void;
}

function addSupplies() {
  const [productFiles, setProductFiles] = useState<Ifile[]>([]);
  const [manualfiles, setManualFiles] = useState<Ifile[]>([]);
  const [submitState, setSubmitState] = useState<boolean>(false);
  const [suppliesMain, setSuppliesMain] = useState<Ifile>({
    name: "",
  });
  const [maunalMain, setManualMain] = useState<Ifile>({
    name: "",
  });
  const toast = useToast();
  const [supplies, setSupplies] = useState<ISupplies>({
    product_name: "",
    manufacturer: "",
    manual_text: "",
    base_medicine: "",
    standard_amount: null,
    input_amount: null,
    input_unit: "",
    disease: "",
    spec: "",
    pump_amount: "",
    source: "",
    source_url: "",
  });
  const dummy: ISupplies = {

    product_name: "네오 C",
    manufacturer: "aquario",
    manual_text: "적당량 투여하세요",
    base_medicine: "모름",
    standard_amount: 40,
    input_amount: 5,
    input_unit: "cc",
    disease: "염소제거제",
    spec: "http://naver.com",
    pump_amount: "",
    source: '아쿠아리오',
    source_url: 'fishhi.kr',

  };

  useEffect(() => {

  });

  const addSupplies = async (fishData: ISupplies) => {
    setSubmitState(true);

    const images = await productImageUpload();
    const images2 = await manualImageUpload();

    if (images.length === 0 || images2.length === 0) {
      toast({
        description: "이미지가 없습니다.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const dataForm: any = {};
    dataForm["category"] = "medicine";
    Object.keys(fishData).map(fish => {
      dataForm[fish] = fishData[fish];
    });

    const suppliesImgArr = images.map((image, idx) => {
      return {
        image_url: image.url,
        is_main: suppliesMain.name === image.filename ? true : false,
      };
    });
    const suppliesImg = images.map((image, idx) => {
      return {
        image_url: image.url,
        is_main: suppliesMain.name === image.filename ? true : false,
      };
    });
    dataForm["images"] = suppliesImgArr;
    dataForm["manual_images"] = suppliesImgArr;
    console.log(dataForm);
    try {
      const suppliesRes = await axios.post("http://54.180.156.194:8000/supplies/", JSON.stringify(dataForm), {
        headers: { "Content-Type": "application/json" },
      });
      if (suppliesRes.status === 201) {
        toast({
          description: "Supplies Created",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (e: any) {

      let description = Object.entries(e.response.data).map((list: any) => {
        return `${list[0]}:${list[1]}`;
      });
      console.log(description);
      toast({
        title: `${e}`,
        description: `${description.join('\n')}\n\nz`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });

    }


    setSubmitState(false);
  };

  const productImageUpload = async () => {
    try {
      if (productFiles.length === 0) {
        setSubmitState(false);
        return [];
      } else {
        const images = await Promise.all(
          productFiles.map(async (file: any) => {

            let fishData = new FormData();
            fishData.append("filename", file.name);
            fishData.append("file", file);
            fishData.append("key", "fishhi/supplies");
            let response = await axios.post("http://54.180.156.194:8000/upload_image", fishData, {
              headers: { "Content-Type": `multipart/form-data` },
            });

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

  const manualImageUpload = async () => {
    try {
      if (manualfiles.length === 0) {
        setSubmitState(false);
        return [];
      } else {
        const images = await Promise.all(
          manualfiles.map(async (file: any) => {

            let fishData = new FormData();
            fishData.append("filename", file.name);
            fishData.append("file", file);
            fishData.append("key", "fish");
            let response = await axios.post("http://54.180.156.194:8000/upload_image", fishData, {
              headers: { "Content-Type": `multipart/form-data` },
            });

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
        {Object.keys(supplies).map((item: any, idx: number) => {
          console.log(typeof item);
          return (
            <div className={styles["addDict-body__input-box"]} key={`${item.id}-${idx}`}>
              <div>{item}</div>
              <input
                id={item}
                placeholder={dummy[item]}

                onChange={e => {
                  setSupplies({
                    ...supplies,
                    [e.target.id]: e.target.value,
                  });
                }}
                disabled={submitState ? true : false}
              ></input>
            </div>
          );
        })}
        <p>제품 이미지</p>
        <Previews files={productFiles} setFiles={setProductFiles} isMain={suppliesMain} setIsMain={setSuppliesMain} />
        <p>설명서 이미지</p>
        <Previews files={manualfiles} setFiles={setManualFiles} isMain={maunalMain} setIsMain={setManualMain} />
        {!submitState ? (
          <Button colorScheme="teal" size="lg" onClick={() => addSupplies(supplies)}>
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

export default addSupplies;
