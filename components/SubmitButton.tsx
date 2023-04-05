import AppButton from './AppButton';
import React from 'react';
import { useFormikContext } from 'formik';

export const SubmitButton = ({ title }: { title: string }) => {
    const { handleSubmit } = useFormikContext();

    return <AppButton title={title} onPress={handleSubmit} />;
};
