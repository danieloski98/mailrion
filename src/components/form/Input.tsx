import { useFormContext, Controller } from 'react-hook-form';
import { Input as TextInput, InputGroup, InputLeftAddon, Box, InputRightAddon, InputProps } from '@chakra-ui/react';
import Text from '../generalComponents/Text';

interface IProps {
    name: string;
    required: boolean;
    password?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    placeholder: string;
    label: string;
}

export default function Input(props: IProps & InputProps) {
    const {
        label,
        name,
        required,
        password = false,
        leftIcon,
        rightIcon,
        placeholder
    } = props
    const { control, formState: { errors } } = useFormContext();
    return (
        <Box flexDirection='column' width={`100%`}>
            <Controller 
                name={name}
                control={control}
                rules={{ required }}
                render={({ field }) => (
                   <>
                    <Text fontFamily='Satoshi-Regular' fontSize='sm'>{label}</Text>
                     <InputGroup width={`100%`}>
                        {leftIcon && <InputLeftAddon>{leftIcon}</InputLeftAddon>}
                        <TextInput
                            fontFamily='Satoshi-Regular'
                            {...props}
                            {...field}
                            required={required}
                            type={password ? 'password' : 'text'}
                            placeholder={placeholder}
                            height={'50px'}
                            width={`100%`}
                            borderRadius={`5px`}
                            borderWidth={'0px'}
                            borderColor={'black'}
                            backgroundColor={`whitesmoke`}
                        />
                        {rightIcon && <InputRightAddon>{rightIcon}</InputRightAddon>}
                    </InputGroup>
                   </>
                )}
            />
            {errors[name] && (
                <Text fontFamily='Satoshi-Light' fontSize='sm' color='red'>{errors[name]?.message as string}</Text>
            )}
        </Box>
    )
}