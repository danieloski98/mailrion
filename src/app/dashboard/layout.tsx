'use client';

import { Box, Flex, HStack, VStack } from '@chakra-ui/react';
import React from 'react';
import Image from 'next/image'
import Logo from '../../../public/images/icon.png';
import Avatar from '../../../public/images/avatar.png';
import { useDetails } from '../state/useDetails';
import Text from '@/app/components/generalcomponents/Text';
import { FiChevronDown } from 'react-icons/fi'
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
  } from '@chakra-ui/react'

export default function DashboardLayout() {
    const { email, name } = useDetails((state) => state)
  return (
    <Flex width={`100%`} height={`100vh`}>
        <Flex width={`100%`} height={`7%`} bg="white" shadow='md' justifyContent={'space-between'} alignItems={'center'} paddingX='20px'>
            <Box width={10} height={10} overflow={'hidden'}>
                <Image src={Logo} alt='logo' />
            </Box>

            <HStack alignItems={'center'} spacing={3}>
                <VStack spacing={0} alignItems='flex-start'>
                    <Text fontFamily='Satoshi-Regular' fontSize='md'>{name}</Text>
                    <Text fontFamily='Satoshi-Regular' fontSize='sm'>{email}</Text>
                </VStack>
               <Popover>
                    <PopoverTrigger>
                        <HStack spacing={-2}>
                        <Box width={10} height={10} overflow={'hidden'}>
                            <Image src={Avatar} alt='logo' />
                        </Box>
                        <FiChevronDown color='grey' size={30} />
                        </HStack>
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverArrow />
                        <PopoverBody>
                            hello there people
                        </PopoverBody>
                    </PopoverContent>
               </Popover>
            </HStack>
        </Flex>
    </Flex>
  );
}
