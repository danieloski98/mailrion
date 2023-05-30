import { Text, Heading } from '@chakra-ui/react'
import React from 'react';

export default function Header({children, fontSize}: { children: React.ReactNode, fontSize: '2xl' | '4xl' |'3xl' | '5xl' }) {
    return (
        <Heading fontFamily='NotoSans-Bold' fontSize={fontSize}>
            {children}
        </Heading>
    );
}