import React, { useState } from 'react';
import {
    Button, Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Image,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    useToast, Slider, SliderTrack, SliderFilledTrack, SliderThumb, SliderMark
} from "@chakra-ui/react";
import { FiChevronDown } from 'react-icons/fi';

enum categoryType  {
    'default' = '옵션',
    'fish' = '물고기',
    'aquaplant' = '수초',
    'supplies' = '용품'
}
export default function dictionaryList() {
    const [category, setCategory] = useState<string>(categoryType.default)
    const clickMenuItem = (item : string) => {
        setCategory(item)
    }
    return (
        <div>
            <Menu>
                <MenuButton as={Button} rightIcon={<FiChevronDown />}>
                    {category}
                </MenuButton>
                <MenuList>
                    <MenuItem id={categoryType.fish} minH='40px' onClick={(e)=>clickMenuItem(categoryType.fish)} >
                        <Image
                            boxSize='2rem'
                            borderRadius='full'
                            src='https://images.unsplash.com/photo-1534043464124-3be32fe000c9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=706&q=80'
                            alt='Simon the pensive'
                            mr='12px'
                        />
                        <span>{categoryType.fish}</span>
                    </MenuItem>

                    <MenuItem minH='48px' onClick={(e)=>clickMenuItem(categoryType.aquaplant)}>
                        <Image
                            boxSize='2rem'
                            borderRadius='full'
                            src='https://images.unsplash.com/photo-1579967327980-2a4117da0e4a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1149&q=80'
                            alt='Fluffybuns the destroyer'
                            mr='12px'
                        />
                        <span>{categoryType.aquaplant}</span>
                    </MenuItem>
                    <MenuItem minH='40px' onClick={(e)=>clickMenuItem(categoryType.supplies)}>
                        <Image
                            boxSize='2rem'
                            borderRadius='full'
                            src='https://ae01.alicdn.com/kf/H5e5c31a2764b4030a4b3a6308bdb3cbbv/Viv-ada.jpg_Q90.jpg_.webp'
                            alt='Simon the pensive'
                            mr='12px'
                        />
                        <span>{categoryType.supplies}</span>
                    </MenuItem>
                </MenuList>
            </Menu>
        </div>
    );
}