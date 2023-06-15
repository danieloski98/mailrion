import { Box } from '@chakra-ui/react'
import React from 'react'
import { TableData } from '../default/variables/columnsData'
import MailsTable from './datatable/Mailstable'
import { columnsUsers } from './datatable/tabledata'

const Mails = () => {
  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <MailsTable 
        columnsData={columnsUsers}
        tableData={([] as unknown) as TableData[]}
      />
    </Box>
  )
}

export default Mails