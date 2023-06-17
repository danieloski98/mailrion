import { Box, Button, Flex, HStack, Spinner, useToast } from "@chakra-ui/react";
import Text from "components/generalComponents/Text";
import { SmtpUserModel } from "models/SmtpUsers";
import React from "react";
import { useMutation, useQuery } from "react-query";
import httpService from "services/httpService";
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
import AddSmtpUserModal from "components/modals/AddSmtpUserModal";
import { useSmtpAccount } from "states/useActiveInbox";

const UsersView = () => {
  const toast = useToast();
  const [addUser, setAddUser] = React.useState(false);
  const [users, setUsers] = React.useState<SmtpUserModel[]>([]);
  const [active, setActive] = React.useState(null);
  const { setAll, id } = useSmtpAccount((state) => state)

  const { isLoading, data } = useQuery(
    ["getSmtpUsers"],
    () => httpService.get("all/smtp/accounts"),
    {
      onSuccess: (data) => {
        console.log(data.data);
        setUsers(data.data.accounts);
      },
      onError: (error: any) => {
        toast({
          title: "Error",
          description: JSON.stringify(error),
          position: "top-left",
          status: "error",
          isClosable: true,
          duration: 5000,
        });
      },
    }
  );

  const createAccount = useMutation({
    mutationFn: (data: any) => httpService.post('/setups/accounts/servers', data),
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: JSON.stringify(data),
        position: "top-left",
        status: "success",
        isClosable: true,
        duration: 5000,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: JSON.stringify(error),
        position: "top-left",
        status: "error",
        isClosable: true,
        duration: 5000,
      });
    }
  });
  if (isLoading) {
    return (
      (
        <Flex pt={{ base: "130px", md: "80px", xl: "80px" }} width='100%' height="100px"  flexDirection='column' alignItems='center' justifyContent='center'>
          <Spinner color="blue.500" size='md' />
          <Text fontSize={"sm"} fontFamily={"Satoshi-Regular"}>Loading SMTP Users</Text>
        </Flex>
      )
    )
  } else {
    return (
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <HStack width='100%' height="60px" alignItems='center' justifyContent='flex-end'>
            <Button onClick={() => setAddUser(true)} borderRadius='5px' backgroundColor='twitter.500' color='white' fontSize='sm' fontFamily='satoshi-regular'> Create SMTP User</Button>
        </HStack>
        <TableContainer
          backgroundColor='white'
        >
          <Table variant="striped">
            <TableCaption>SMTP Users</TableCaption>
            <Thead>
              <Tr>
                <Th isNumeric>S/N</Th>
                <Th>Name</Th>
                <Th>Username</Th>
                <Th>Hostname</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {!isLoading && users.length > 0 && users.map((user: SmtpUserModel, index: number) => (
                <Tr key={index}>
                  <Td isNumeric>{index + 1}</Td>
                  <Td>{user.attributes.name}</Td>
                  <Td>{user.attributes.username}</Td>
                  <Td>{user.attributes.hostname}</Td>
                  <HStack>
                    <Button isLoading={active === index && isLoading} borderRadius='5px' backgroundColor="twitter.500" color="white" fontFamily='satoshi-regular' fontSize='md' onClick={() => {
                      setActive(index);
                      createAccount.mutate({ account: user.id, name: user.attributes.name, hostname: user.attributes.hostname, password: user.attributes.name })
                    }} >Create User Account</Button>

                    <Button isLoading={active === index && isLoading} borderRadius='5px' backgroundColor="twitter.500" color="white" fontFamily='satoshi-regular' fontSize='md' onClick={() => {
                    setAll(user);
                    localStorage.setItem('ActiveAccount', JSON.stringify(user))
                  }} >
                    { id === user.id ? 'Active Account':'Set as active'}
                  </Button>
                  </HStack>
                </Tr>
              ))}
            </Tbody>
            {/* <Tfoot>
              <Tr>
                <Th>To convert</Th>
                <Th>into</Th>
                <Th isNumeric>multiply by</Th>
              </Tr>
            </Tfoot> */}
          </Table>
        </TableContainer>

        <AddSmtpUserModal open={addUser} onClose={() => setAddUser(false)} />
      </Box>
    );
  }
 
};

export default UsersView;
