import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    VStack,
    Button,
    useToast,
    Spacer,
    Box,
  } from '@chakra-ui/react'
import useForm from 'hooks/useForm'
import { smtpUserSchema } from 'services/validations';
import Input from 'components/form/Input';
import { useMutation } from 'react-query';
import httpService from 'services/httpService';
import { useDetails } from 'states/useDetails';

interface IProps {
    open: boolean;
    onClose: () => void;
}

const AddSmtpUserModal = ({ open, onClose }: IProps) => {
    const toast = useToast()
    const { id } = useDetails((state) => state)
    const { renderForm, getValues, } = useForm({
        defaultValues: {
            name: '',
            username: '',
            hostname: '',
            password: '',
        },
        onSubmit: (e) => mutate(e),
        validationSchema: smtpUserSchema
    });
    const { isLoading, mutate } = useMutation({
        mutationFn: (data: any) => httpService.post('/creates/smtp/accounts', data),
        onSuccess: (data) => {
            console.log(`this is the id: ${id} type:${typeof id}`);
            createUserMutation()
        },
        onError: (error: any) => {
            toast({
                title: 'Error',
                description: JSON.stringify(error),
                status: 'error',
                isClosable: true,
                position: 'top-right',
                duration: 5000,
            })
        }
    })

    const { isLoading: serverLoading, mutate: createUserMutation } = useMutation({
        mutationFn: () => httpService.post('/setups/accounts/servers', { ...getValues(), account: id  }),
        onSuccess: (data) => {
            console.log(data.data);
            toast({
                title: 'Success',
                description: 'User created successfully',
                status: 'success',
                isClosable: true,
                position: 'top-right',
                duration: 5000,
            })
        },
        onError: (error: any) => {
            toast({
                title: 'Error',
                description: JSON.stringify(error),
                status: 'error',
                isClosable: true,
                position: 'top-right',
                duration: 5000,
            })
        }
    })
    
  return (
    <Modal isOpen={open} isCentered onClose={() => onClose()}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Create SMTP User</ModalHeader>
            <ModalCloseButton />
            <ModalBody paddingBottom='20px'>
                <VStack spacing={6}>
                    {
                        renderForm(
                            <>
                                <Input name='name' label='Name' required placeholder='Enter name' />
                                <Box height='20px' />
                                <Input name='username' label='Username' required placeholder='Enter Username' />
                                <Box height='20px' />
                                <Input name='hostname' label='Hostame' required placeholder='Enter Hostname' />
                                <Box height='20px' />
                                <Input name='password' password label='Password' required placeholder='Enter password' />
                                <Box height='20px' />
                                <Button type='submit' isLoading={isLoading || serverLoading} marginTop='20px' width='100%' borderRadius='5px' backgroundColor="twitter.500" color="white" fontFamily='satoshi-regular' fontSize='sm'>Create User</Button>
                            </>
                        )
                    }
                </VStack>
                
            </ModalBody>
        </ModalContent>
    </Modal>
  )
}

export default AddSmtpUserModal
