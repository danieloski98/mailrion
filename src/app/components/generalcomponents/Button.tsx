import { ButtonProps, Button as ChakraButton } from '@chakra-ui/react'

interface IProps {
    backgroundColor?: string;
    width?: string;
    isLoading?: boolean;
    color?: string;
    type: 'button' | 'reset' | 'submit';
    children?: React.ReactNode;
}

export default function Button(props: IProps & ButtonProps) {
    const {
        backgroundColor = 'black',
        children,
        width = '100%',
        isLoading,
        color = 'white',
        type = 'button'
    } = props;
    return (
        <ChakraButton {...props} isLoading={isLoading} color={color} bgColor={backgroundColor} fontFamily='Satoshi-Regular' borderRadius={0}  width={width} height={`55px`} type={type}>
            {children}
        </ChakraButton>
    )
}