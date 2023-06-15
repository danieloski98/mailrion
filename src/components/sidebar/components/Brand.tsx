// Chakra imports
import { Flex, useColorModeValue } from '@chakra-ui/react';
import Image from 'next/image'
import Logo from '../../../../public/images/logo-ct.png'

// Custom components
import { HorizonLogo } from 'components/icons/Icons';
import { HSeparator } from 'components/separator/Separator';

export function SidebarBrand() {
	//   Chakra color mode
	let logoColor = useColorModeValue('navy.700', 'white');

	return (
		<Flex alignItems='center' flexDirection='column' px="20px">
			<Image src={Logo} alt='logo' color={logoColor} />
			<HSeparator mb='20px' />
		</Flex>
	);
}

export default SidebarBrand;
