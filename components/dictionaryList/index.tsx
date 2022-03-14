import React, { useEffect, useState } from 'react';
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
} from '@chakra-ui/react';

import { FiChevronDown } from 'react-icons/fi';
import Category from './Category';
import axios from 'axios';

export enum categoryType {
    'default' = '옵션',
    'fish' = '물고기',
    'aquaplant' = '수초',
    'supplies' = '용품'
}



export default function dictionaryList() {
    const [category, setCategory] = useState<string>(categoryType.default);
    const [listData, setListData] = useState<[]>([]);
    const clickMenuItem = (item: string) => {
        setCategory(item);
    };
    const getPost = async () => {
        const res = await axios.get('http://54.180.156.194:8000/fish/?offset=0&limit=100');
        setListData(res.data.results);
    };

    const deletePost = async (id: number) => {
        const res = await axios.delete(`http://54.180.156.194:8000/fish/${id}`);
        console.log(res);
    };
    const deleteList = () => {
        switch (category) {
            case categoryType.fish:

        }
    };

    useEffect(() => {
        console.log(getPost());
    }, []);
    return (

        <div>
            <Category />
            <Table variant='simple'>
                <TableCaption>Imperial to metric conversion factors</TableCaption>
                <Thead>
                    <Tr>
                        <Th width={'15px'} isNumeric>id</Th>
                        <Th >어종</Th>
                        <Th >이미지</Th>
                        <Th >관리</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {listData.map((post: any) => {
                        return (
                            <Tr>
                                <Td isNumeric>{post.id}</Td>
                                <Td>{post.species}</Td>
                                <Td ><img style={{ width: '80px' }} src={post.thumbnail} /></Td>
                                <Td >
                                    <Button colorScheme='teal' size='xs' onClick={() => deletePost(post.id)}>삭제</Button>
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