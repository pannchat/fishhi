import React, { useEffect, useState } from 'react';
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Button,
  useToast
} from '@chakra-ui/react';


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
  const router = useRouter();

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

  const handleEditClick = (id: number) => {


    switch (category) {
      case categoryType.fish:
        router.push(`/editFish/${id}/`);
        break;
      case categoryType.aquaplant:
        router.push(`/editAquaPlant/${id}/`);
        break;
      case categoryType.supplies:
        router.push(`/editSupplies/${id}/`);
        break;

    }
  };

  const handleAdd = () => {
    switch (category) {
      case categoryType.fish:
        router.push(`/addFish/`);
        break;
      case categoryType.aquaplant:
        router.push(`/addAquaplant/`);
        break;
      case categoryType.supplies:
        router.push(`/addSupplies/`);
        break;
    }
  };

  useEffect(() => {
    getPost();
  }, [category]);

  return (

    <div>
      <div className={styles['category__menu']}>
        <Category category={category} setCategory={setCategory} />
        <Button size="xs" colorScheme="teal" onClick={() => handleAdd()}> 추가 </Button>
      </div>
      <Table variant='simple' className={styles['category__table']}>
        <Thead>
          <Tr>
            <Th width={'15px'} isNumeric>id</Th>
            <Th>어종</Th>
            <Th>이미지</Th>
            <Th>관리</Th>
          </Tr>
        </Thead>
        <Tbody>
          {listData.map((post: any) => {
            return (
              <Tr>
                <Td isNumeric>{post.id}</Td>
                <Td><Link href={`http://localhost:4000/info/fish/${post.id}`}>{post.species}</Link></Td>
                <Td><img style={{ width: '80px' }} src={post.thumbnail} /></Td>
                <Td>
                  <Button isLoading={IsLoading} loadingText={IsLoading ? '' : "삭제"} size="xs" colorScheme="red" variant={IsLoading ? 'outline' : undefined} onClick={
                    () => handleDeleteClick(post.id)
                  }>삭제</Button>
                  <Button isLoading={IsLoading} loadingText={IsLoading ? '' : "수정"} size="xs" colorScheme="teal" variant={IsLoading ? 'outline' : undefined} onClick={
                    () => handleEditClick(post.id)
                  } >수정</Button>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </div>
  );
}
