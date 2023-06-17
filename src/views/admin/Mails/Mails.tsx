import { Box } from '@chakra-ui/react'
import React from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { useQuery } from 'react-query';
import httpService from 'services/httpService';

const Mails = () => {
  const { isLoading, data } = useQuery(
    ["getSmtpUsers"],
    () => httpService.get("all/smtp/accounts"),
    {
      onSuccess: (data) => {
        console.log(data.data);
      },
      onError: (error: any) => {
        // toast({
        //   title: "Error",
        //   description: JSON.stringify(error),
        //   position: "top-left",
        //   status: "error",
        //   isClosable: true,
        //   duration: 5000,
        // });
      },
    }
  );
  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      
    </Box>
  )
}

export default Mails