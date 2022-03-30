/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, Button, useToast } from "@chakra-ui/react";

import Category from "./Category";
import axios from "axios";
import styles from "./index.module.scss";
import useHideNavbar from "../../shared/hooks/useHideNavbar";
import useHideFooter from "../../shared/hooks/useHideFooter";
import LinkCustom from "../../shared/commonComponent/link";

export enum categoryType {
  "default" = "fish",
  "fish" = "fish",
  "aquaplant" = "aquaplant",
  "supplies" = "supplies",
}

export default function dictionaryList() {
  const [category, setCategory] = useState<string>(categoryType.default);
  const [listData, setListData] = useState<[]>([]);
  const [IsLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();

  const getPost = async () => {
    const res = await axios.get(`http://54.180.156.194:8000/${category}/?offset=0&limit=100`);
    setListData(res.data.results);
  };

  const deletePost = async (id: number) => {
    const res = await axios.delete(`http://54.180.156.194:8000/${category}/${id}/`);
    if (res.status === 204) {
      getPost();
      setIsLoading(false);
      toast({
        title: `삭제 완료`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
    }
  };

  const handleDeleteClick = (id: number) => {
    deletePost(id);
    setIsLoading(true);
  };

  const handleAdd = () => {
    switch (category) {
      case categoryType.fish:
        location.href = "/addFish";
        break;
      case categoryType.aquaplant:
        location.href = "/addAquaPlant";
        break;
      case categoryType.supplies:
        location.href = "/addSupplies";
        break;
    }
  };

  useHideNavbar();
  useHideFooter();
  useEffect(() => {
    getPost();
    console.log(category);
  }, [category]);

  return (
    <div className={styles["dictionary__wrapper"]}>
      <div className={styles["category__menu"]}>
        <div className={styles["category__left"]}>
          <LinkCustom href={"/"}>
            <Button
              width={"100px"}
              height={"50px"}
              fontSize={"16px"}
              fontWeight={700}
              color={"white"}
              backgroundColor={"#4b5ab4"}
              _hover={{
                backgroundColor: "#4b5ab4",
              }}
            >
              홈으로
            </Button>
          </LinkCustom>
          <Category category={category} setCategory={setCategory} />
        </div>
        <Button size="xs" colorScheme="teal" onClick={() => handleAdd()}>
          {" "}
          추가{" "}
        </Button>
      </div>
      <Table variant="simple" className={styles["category__table"]}>
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            <Th width={"15px"} isNumeric>
              id
            </Th>
            <Th>어종</Th>
            <Th>이미지</Th>
            <Th>관리</Th>
          </Tr>
        </Thead>
        <Tbody>
          {listData.map((post: any, index: number) => {
            return (
              <Tr key={`listDataTableRow_${index}`}>
                <Td isNumeric>{post.id}</Td>
                <Td>{post.species}</Td>
                <Td>
                  <img style={{ width: "80px" }} src={post.thumbnail} />
                </Td>
                <Td width={"30%"}>
                  <Button
                    width={"35%"}
                    isLoading={IsLoading}
                    loadingText={IsLoading ? "" : "삭제"}
                    colorScheme="red"
                    variant={IsLoading ? "outline" : undefined}
                    onClick={() => handleDeleteClick(post.id)}
                    marginLeft={"auto"}
                    marginRight={"auto"}
                  >
                    삭제
                  </Button>
                  <Button
                    width={"35%"}
                    isLoading={IsLoading}
                    loadingText={IsLoading ? "" : "수정"}
                    colorScheme="teal"
                    variant={IsLoading ? "outline" : undefined}
                    marginLeft={"auto"}
                    marginRight={"auto"}
                  >
                    수정
                  </Button>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
        {/* <Tfoot>
                    <Tr>
                        <Th>To convert</Th>
                        <Th>into</Th>
                        <Th isNumeric>multiply by</Th>
                    </Tr>
                </Tfoot> */}
      </Table>
    </div>
  );
}
