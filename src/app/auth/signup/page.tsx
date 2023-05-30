'use client';

import useForm from '@/app/components/formcomponents/Form';
import Input from '@/app/components/formcomponents/Input';
import Button from '@/app/components/generalcomponents/Button';
import Text from '@/app/components/generalcomponents/Text'
import httpService from '@/app/services/httpService';
import { SignupSchema } from '@/app/services/validations';
import { Flex, Stack, VStack, useToast } from '@chakra-ui/react'
import Link from 'next/link';
import { useMutation } from 'react-query';
import { useRouter } from 'next/navigation';


export default function Signup() {
    const toast = useToast();
    const router = useRouter();

    const { mutate, isLoading } = useMutation({
        mutationFn: (data: any) => httpService.post('creates/users/accounts', data),
        onSuccess: (data: any) => {
            toast({
                title: 'success',
                description:' Account created',
                status: 'success',
                position: 'top-right',
                duration: 6000,
                isClosable: true,
            });
            router.push('/auth/login');
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
    })
    const { renderForm, watch, formState } = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
        onSubmit: (data: any) => mutate(data),
        validationSchema: SignupSchema,
    });
    console.log(formState.errors)
    return renderForm(
       <Flex flex='1' width={`100%`} height={`100%`} flexDirection={`column`} padding={`20px`}>
            <Text fontFamily='Satoshi-Medium' fontSize='xl'>Sign up</Text>

            <VStack spacing={5} marginTop={'20px'} width={`100%`}>
                <Input required name="name" label='Full Name' placeholder='example@email.com'  />
                <Input required name="email" label='Email' placeholder='example@email.com'  />
                <Input required name="password" label='Password' placeholder='*****' password  />
                <Button type='submit' isLoading={isLoading} >Sign up</Button>
            </VStack>

            <Text fontFamily='Satoshi-Regular' fontSize='sm' cursor='pointer' marginTop={20} >Already have an account? <Link href="/auth/login" style={{ textDecoration: 'underline'}}>Login</Link> </Text>

       </Flex>
    )
}