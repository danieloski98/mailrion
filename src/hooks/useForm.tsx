import React from 'react';
import { useForm as Form, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod';


interface IProps {
    defaultValues: Record<string, any>;
    validationSchema?: z.Schema<any>;
    onSubmit: (data: any) => void;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
}

export default function useForm({ validationSchema, defaultValues, onSubmit, method = 'POST' }: IProps) {
    const methods = Form({
        defaultValues,
        resolver: zodResolver(validationSchema)
    });

    const { handleSubmit, watch, formState, getValues } = methods

    const renderForm = React.useCallback((children: React.ReactNode) => {
        return (
            <FormProvider {...methods}>
                <form method={method} onSubmit={handleSubmit(onSubmit)}>
                    {children}
                </form>
            </FormProvider>
        )
    }, [handleSubmit, method, methods, onSubmit]);
    return {
        renderForm,
        watch,
        formState,
        getValues,
    }
}