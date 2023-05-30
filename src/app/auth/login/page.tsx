'use client';

import useForm from '@/app/components/formcomponents/Form';
import Input from '@/app/components/formcomponents/Input';
import Button from '@/app/components/generalcomponents/Button';
import Text from '@/app/components/generalcomponents/Text'
import httpService from '@/app/services/httpService';
import { LoginSchema } from '@/app/services/validations';
import { useDetails } from '@/app/state/useDetails';
import { Flex, VStack, useToast } from '@chakra-ui/react'
import Link from 'next/link';
import { useMutation } from 'react-query';

type LoginData = {
    accessToken: string,
    message: string,
    user: {
        attributes: {
            email: string,
            name: string,
        },
        id: string,
        type: string,
    },

}

export default function Login() {
    const toast = useToast();
    const { setAll } = useDetails((state) => state);
    
    const { mutate, isLoading } = useMutation({
        mutationFn: (data: any) => httpService.post('login', data),
        onSuccess: (data: any) => {
            console.log(data.data);
            localStorage.setItem('token', (data.data as LoginData).accessToken);
            setAll({ ...(data.data as LoginData).user.attributes });
            toast({
                title: 'success',
                description: (data.data as LoginData).message,
                status: 'success',
                position: 'top-right',
                duration: 6000,
                isClosable: true,
            });
        },
        onError: (error: any) => {
            toast({
                title: 'Error',
                description: error,
                status: 'error',
                position: 'top-right',
                duration: 6000,
                isClosable: true,
            });
        },
    });

    const { renderForm } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        onSubmit: (data: any) => mutate(data),
        validationSchema: LoginSchema,
    });
    return renderForm(
       <Flex flex='1' width={`100%`} height={`100%`} flexDirection={`column`} padding={`20px`}>
            <Text fontFamily='Satoshi-Medium' fontSize='xl'>Login</Text>

            <VStack spacing={5} marginTop={'20px'} width={`100%`}>
                <Input required name="email" label='Email' placeholder='example@email.com'  />
                <Input required name="password" label='Password' placeholder='*****' password  />
                <Button type='submit' isLoading={isLoading} >Login</Button>
            </VStack>

            <Text fontFamily='Satoshi-Regular' fontSize='sm' cursor='pointer' marginTop={20} >Don&apos;t have an account? <Link href="/auth/signup" style={{ textDecoration: 'underline'}}>Sign up</Link> </Text>

       </Flex>
    )
}