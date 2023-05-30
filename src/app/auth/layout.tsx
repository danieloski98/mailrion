'use client';
import { Box, Flex } from '@chakra-ui/react'
import Image from 'next/image'
import Logo from '../../../public/images/logo-ct.png'
import SendMail from '../../../public/images/mailbox.svg'
import Text from '@/app/components/generalcomponents/Text';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <Flex width={`100%`} height={`100vh`} justifyContent={`center`} backgroundColor='white'>
            <Flex width={[`100%`, `40%`]} height={`70%`} flexDirection={'column'}>

                <Flex width={`100%`} height={['100px', '100px']} justifyContent={`center`}>
                    <Image
                        src={Logo}
                        alt='company logo'
                        height={100}
                        style={{ width: '60%' }}
                    />
                </Flex>
                
                <Flex flex={`1`} marginTop={`20px`} shadow={`lg`}>

                    <Flex flex="1" backgroundColor='lightgrey' display={['none', 'flex']} justifyContent={'center'} alignItems={'center'}>
                        <Image src={SendMail} alt='company logo'  style={{ width: '80%', height: '100%' }} />
                    </Flex>

                    <Box flex={1} width="100%" backgroundColor='white'>
                        {children}
                    </Box>

                </Flex>

                <Flex justifyContent={'center'} paddingTop='30px'>
                    <Text fontSize='lg' fontFamily='Satoshi-Regular' textDecoration='underline' cursor='pointer'>Home</Text>
                    <Text fontSize='lg' fontFamily='Satoshi-Regular' textDecoration='underline' marginX='10px' cursor='pointer'>About</Text>
                    <Text fontSize='lg' fontFamily='Satoshi-Regular' textDecoration='underline' cursor='pointer'>Contact</Text>
                </Flex>

            </Flex>
        </Flex>
    )
}