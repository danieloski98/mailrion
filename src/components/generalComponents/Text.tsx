import { Text as P, TextProps } from '@chakra-ui/react'
import React from 'react';

export default function Text(props: { children: React.ReactNode, fontSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl', fontFamily: 'Satoshi-Regular' | 'Satoshi-Medium' | 'Satoshi-Light' } & TextProps)  {
    const {children, fontSize, fontFamily} = props;
    return (
        <P {...props} fontFamily={fontFamily} fontSize={fontSize}>
            {children}
        </P>
    );
}