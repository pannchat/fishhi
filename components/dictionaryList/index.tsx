import React, { useEffect, useState } from 'react';
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

import Category from './Category';
import axios from 'axios';
import styles from './index.module.scss';

export enum categoryType {
    'default' = 'fish',
    'fish' = 'fish',
    'aquaplant' = 'aquaplant',
    'supplies' = 'supplies'
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

    useEffect(() => {
        getPost();
        console.log(category);
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
                                    <Button isLoading={IsLoading} loadingText={IsLoading ? '' : "수정"} size="xs" colorScheme="teal" variant={IsLoading ? 'outline' : undefined} >수정</Button>
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