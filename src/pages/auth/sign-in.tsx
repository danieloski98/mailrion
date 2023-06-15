

import React from 'react';
// Chakra imports
import {
	Box,
	Button,
	Checkbox,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Icon,
	InputGroup,
	InputRightElement,
	Text,
	useColorModeValue,
	useToast
} from '@chakra-ui/react';
// Custom components
import { HSeparator } from 'components/separator/Separator';
import DefaultAuthLayout from 'layouts/auth/Default';
// Assets
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';
import useForm from 'hooks/useForm';
import { LoginSchema, SignupSchema } from 'services/validations';
import { useMutation } from 'react-query';
import httpService from 'services/httpService';
import { useRouter } from 'next/router';
import Input from 'components/form/Input';
import { useDetails } from 'states/useDetails';

export type LoginData = {
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

export default function SignIn() {
	const { setAll } = useDetails((state) => state)
	// Chakra color mode
	const textColor = useColorModeValue('navy.700', 'white');
	const textColorSecondary = 'gray.400';
	const textColorDetails = useColorModeValue('navy.700', 'secondaryGray.600');
	const textColorBrand = useColorModeValue('brand.500', 'white');
	const brandStars = useColorModeValue('brand.500', 'brand.400');
	const toast = useToast();
    const router = useRouter();

	const { mutate, isLoading } = useMutation({
        mutationFn: (data: any) => httpService.post('login', data),
        onSuccess: (data: any) => {
			localStorage.setItem('token', (data.data as LoginData).accessToken);
            localStorage.setItem('authUser', JSON.stringify((data.data as LoginData)));
            setAll({ ...(data.data as LoginData).user.attributes });
            toast({
                title: 'success',
                description:' Account created',
                status: 'success',
                position: 'top-right',
                duration: 6000,
                isClosable: true,
            });
            router.push('/admin');
        },
        onError: (error: any) => {
			console.log(error);
            toast({
                title: 'Error',
                description: JSON.stringify(error),
                status: 'error',
                position: 'top-right',
                duration: 6000,
                isClosable: true,
            });
        },
    })
	
	// forms component
	const { renderForm} = useForm({
		defaultValues: {
            email: '',
            password: '',
        },
        onSubmit: (data: any) => mutate(data),
        validationSchema: LoginSchema,
	});
	const [ show, setShow ] = React.useState(false);
	const handleClick = () => setShow(!show);
	return renderForm(
		<DefaultAuthLayout illustrationBackground={'/img/curve.jpg'}>
			<Flex
				maxW={{ base: '100%', md: 'max-content' }}
				w='100%'
				mx={{ base: 'auto', lg: '0px' }}
				me='auto'
				h='100%'
				alignItems='start'
				justifyContent='center'
				mb={{ base: '30px', md: '60px' }}
				px={{ base: '25px', md: '0px' }}
				mt={{ base: '40px', md: '14vh' }}
				flexDirection='column'>
				<Box me='auto'>
					<Heading color={textColor} fontSize='36px' mb='10px'>
						Sign In
					</Heading>
					<Text mb='36px' ms='4px' color={textColorSecondary} fontWeight='400' fontSize='md'>
						Enter your email and password to sign in!
					</Text>
				</Box>
				<Flex
					zIndex='2'
					direction='column'
					w={{ base: '100%', md: '420px' }}
					maxW='100%'
					background='transparent'
					borderRadius='15px'
					mx={{ base: 'auto', lg: 'unset' }}
					me='auto'
					mb={{ base: '20px', md: 'auto' }}>
				
					<FormControl>
						
						<Input required name="email" placeholder='Email' label='Email' />
						<InputGroup size='md' marginTop='20px'>
							<Input
								required name="password" password placeholder='password' label='Password'
							/>
							
						</InputGroup>
						<Flex justifyContent='space-between' align='center' mb='24px' mt="20px">
							<FormControl display='flex' alignItems='center'>
								<Checkbox id='remember-login' colorScheme='brandScheme' me='10px' />
								<FormLabel
									htmlFor='remember-login'
									mb='0'
									fontWeight='normal'
									color={textColor}
									fontSize='sm'>
									Keep me logged in
								</FormLabel>
							</FormControl>
							<Link href='/auth/forgot-password'>
								<a>
									<Text color={textColorBrand} fontSize='sm' w='124px' fontWeight='500'>
										Forgot password?
									</Text>
								</a>
							</Link>
						</Flex>
						<Button type='submit' isLoading={isLoading} fontSize='sm' variant='brand' fontWeight='500' w='100%' h='50' mb='24px'>
							Sign In
						</Button>
					</FormControl>
					<Flex flexDirection='column' justifyContent='center' alignItems='start' maxW='100%' mt='0px'>
						<Text color={textColorDetails} fontWeight='400' fontSize='14px'>
							Not registered yet?
							<Link href='/auth/sign-up'>
								<a>
									<Text color={textColorBrand} as='span' ms='5px' fontWeight='500'>
										Create an Account
									</Text>
								</a>
							</Link>
						</Text>
					</Flex>
				</Flex>
			</Flex>
		</DefaultAuthLayout>
	);
}
