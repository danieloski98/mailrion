import { Box, useToast } from '@chakra-ui/react'
import Text from 'components/generalComponents/Text'
import React from 'react'
import { useQuery } from 'react-query'
import httpService from 'services/httpService'
import CheckTable from '../default/components/CheckTable'
import { TableData } from '../default/variables/columnsData'
import { columnsUsers } from './datatable/tabledata'
import UsersTable from './datatable/Usertable'

const UsersView = () => {
  const toast = useToast();
  const { isLoading, data } = useQuery(['getSmtpUsers'], () => httpService.get('all/smtp/accounts'), {
    onSuccess: (data) => {
      console.log(data.data);
    },
    onError: (error: any) => {
        toast({
          title: 'Error',
          description: JSON.stringify(error),
          position: 'top-left',
          status: 'error',
          isClosable: true,
          duration: 5000,
        })
    }
  })
  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
        <UsersTable
          columnsData={columnsUsers}
          tableData={([] as unknown) as TableData[]}
        />
    </Box>
  )
}

export default UsersView
